import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../mock/initialState.json';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../models/felles/spørsmålogsvar';
import { ForrigeSøknad, ISøknad } from './models/søknad';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmålForBarn,
} from '../helpers/steg/dokumentasjon';
import { IMellomlagretBarnetilsynSøknad } from './models/mellomlagretSøknad';
import Environment from '../Environment';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import {
  hentDataFraForrigeBarnetilsynSøknad,
  hentMellomlagretSøknadFraDokument,
  hentPersonData,
  mellomlagreSøknadTilDokument,
  nullstillMellomlagretSøknadTilDokument,
} from '../utils/søknad';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IPerson, PersonData } from '../models/søknad/person';
import { IBarn } from '../models/steg/barn';
import { hvaErDinArbeidssituasjonSpm } from './steg/5-aktivitet/AktivitetConfig';
import { useSpråkContext } from '../context/SpråkContext';
import { LokalIntlShape } from '../language/typer';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { oppdaterBarneliste, oppdaterBarnIBarneliste } from '../utils/barn';
import { LocaleType } from '../language/typer';
import { dagensDato, formatIsoDate } from '../utils/dato';
import { IMedforelderFelt } from '../models/steg/medforelder';
import { IForelder } from '../models/steg/forelder';
import { hentUid } from '../utils/autentiseringogvalidering/uuid';

const initialState = (intl: LokalIntlShape): ISøknad => {
  return {
    person: tomPerson,
    sivilstatus: {},
    medlemskap: {},
    bosituasjon: {
      delerBoligMedAndreVoksne: {
        spørsmålid: EBosituasjon.delerBoligMedAndreVoksne,
        svarid: '',
        label: '',
        verdi: '',
      },
    },
    aktivitet: {
      hvaErDinArbeidssituasjon: {
        spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
        svarid: [],
        label: '',
        verdi: [],
        alternativer: hvaErDinArbeidssituasjonSpm(intl).svaralternativer.map(
          (svaralternativ) => svaralternativ.svar_tekst
        ),
      },
    },
    dokumentasjonsbehov: [],
    harBekreftet: false,
    datoPåbegyntSøknad: formatIsoDate(dagensDato),
  };
};

const [BarnetilsynSøknadProvider, useBarnetilsynSøknad] = createUseContext(
  () => {
    const intl = useLokalIntlContext();
    BarnetilsynSøknadProvider.displayName = 'BARNETILSYN_PROVIDER';
    const [locale, setLocale] = useSpråkContext();
    const [søknad, settSøknad] = useState<ISøknad>(initialState(intl));
    const [mellomlagretBarnetilsyn, settMellomlagretBarnetilsyn] =
      useState<IMellomlagretBarnetilsynSøknad>();

    useEffect(() => {
      if (
        mellomlagretBarnetilsyn?.locale &&
        mellomlagretBarnetilsyn?.locale !== locale
      ) {
        setLocale(mellomlagretBarnetilsyn.locale as LocaleType);
      }
    }, [mellomlagretBarnetilsyn, locale, setLocale]);

    const hentMellomlagretBarnetilsyn = (): Promise<void> => {
      return hentMellomlagretSøknadFraDokument<IMellomlagretBarnetilsynSøknad>(
        MellomlagredeStønadstyper.barnetilsyn
      ).then((mellomlagretVersjon?: IMellomlagretBarnetilsynSøknad) => {
        if (mellomlagretVersjon) {
          settMellomlagretBarnetilsyn(mellomlagretVersjon);
        }
      });
    };

    const brukMellomlagretBarnetilsyn = () => {
      if (mellomlagretBarnetilsyn) {
        settSøknad(mellomlagretBarnetilsyn.søknad);
      }
    };

    const hentForrigeSøknadBarnetilsyn = async (): Promise<void> => {
      const forrigeSøknad = await hentDataFraForrigeBarnetilsynSøknad();
      const personData = await hentPersonData();
      console.log('personData', personData);

      if (forrigeSøknad) {
        settSøknad((prevSøknad) => {
          const aktuelleBarn = forrigeSøknad.person.barn.filter((barn) =>
            personData.barn.some(
              (personBarn) => personBarn.fnr === barn.ident.verdi
            )
          );

          return {
            ...prevSøknad,
            ...forrigeSøknad,
            person: {
              ...prevSøknad.person,
              barn: [
                ...aktuelleBarn.map((barn) => {
                  const medforelder = finnGjeldendeBarnOgLagMedforelderFelt(
                    barn,
                    personData
                  );
                  const erAnnenForelderEndret =
                    medforelder?.verdi.navn !== barn.forelder?.navn;

                  const forelder = erAnnenForelderEndret
                    ? undefined
                    : finnGjeldendeBarnOgNullstillAnnenForelderHvisDød(
                        barn,
                        personData,
                        barn.forelder!
                      );

                  return {
                    ...barn,
                    medforelder,
                    forelder: forelder
                      ? {
                          ...forelder,
                          id: hentUid(),
                        }
                      : undefined,
                    fraFolkeregister: prevSøknad.person.barn.find(
                      (prevBarn) => prevBarn.ident.verdi === barn.ident.verdi
                    )?.forelder?.fraFolkeregister,
                    erFraForrigeSøknad: true,
                  };
                }),
                ...finnNyeBarnSidenForrigeSøknad(prevSøknad, forrigeSøknad),
              ].sort((a, b) => {
                if (a.medforelder?.verdi && !b.medforelder?.verdi) {
                  return -1;
                }
                if (!a.medforelder?.verdi && b.medforelder?.verdi) {
                  return 1;
                }
                return 0;
              }),
            },
          };
        });
      }
    };

    const finnGjeldendeBarnOgLagMedforelderFelt = (
      barn: IBarn,
      personData: PersonData
    ): IMedforelderFelt | undefined => {
      const gjeldendeBarn = personData.barn.find(
        (personBarn) => personBarn.fnr === barn.ident.verdi
      );
      return gjeldendeBarn?.medforelder
        ? {
            label: 'Annen forelder',
            verdi: gjeldendeBarn?.medforelder,
          }
        : undefined;
    };

    const finnGjeldendeBarnOgNullstillAnnenForelderHvisDød = (
      barn: IBarn,
      personData: PersonData,
      forelder: IForelder
    ): IForelder => {
      const gjeldendeBarn = personData.barn.find(
        (personBarn) => personBarn.fnr === barn.ident.verdi
      );

      if (gjeldendeBarn?.medforelder?.død === true) {
        return {
          ...forelder,
          ikkeOppgittAnnenForelderBegrunnelse: undefined,
          hvorforIkkeOppgi: undefined,
          fødselsdato: undefined,
          borINorge: undefined,
          land: undefined,
          avtaleOmDeltBosted: undefined,
          harAnnenForelderSamværMedBarn: undefined,
          harDereSkriftligSamværsavtale: undefined,
          hvordanPraktiseresSamværet: undefined,
          borAnnenForelderISammeHus: undefined,
          borAnnenForelderISammeHusBeskrivelse: undefined,
          boddSammenFør: undefined,
          flyttetFra: undefined,
          hvorMyeSammen: undefined,
          beskrivSamværUtenBarn: undefined,
          skalBarnetBoHosSøker: undefined,
        };
      } else {
        return forelder;
      }
    };

    useEffect(() => {
      console.log('søknad i BarnetilsynContext', søknad);
    }, [søknad]);

    const finnNyeBarnSidenForrigeSøknad = (
      prevSøknad: ISøknad,
      forrigeSøknad: ForrigeSøknad
    ) => {
      return prevSøknad.person.barn.filter(
        (barn) =>
          !forrigeSøknad.person.barn.some(
            (prevBarn) => prevBarn.ident.verdi === barn.ident.verdi
          )
      );
    };

    const mellomlagreBarnetilsyn = (steg: string) => {
      const utfyltSøknad = {
        søknad: søknad,
        modellVersjon: Environment().modellVersjon.barnetilsyn,
        gjeldendeSteg: steg,
        locale: locale,
      };
      mellomlagreSøknadTilDokument(
        utfyltSøknad,
        MellomlagredeStønadstyper.barnetilsyn
      );
      settMellomlagretBarnetilsyn(utfyltSøknad);
    };

    const nullstillMellomlagretBarnetilsyn = (): Promise<any> => {
      return nullstillMellomlagretSøknadTilDokument(
        MellomlagredeStønadstyper.barnetilsyn
      );
    };

    const nullstillSøknadBarnetilsyn = (
      person: IPerson,
      barnMedLabels: IBarn[]
    ) => {
      settSøknad({
        ...initialState(intl),
        person: { ...person, barn: barnMedLabels },
      });
      settMellomlagretBarnetilsyn(undefined);
    };

    const settDokumentasjonsbehovForBarn = (
      spørsmål: ISpørsmål,
      valgtSvar: ISvar,
      barneid: string,
      barnepassid?: string
    ) => {
      let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;
      if (spørsmål.flersvar) {
        console.error('Ikke implementert');
      } else {
        endretDokumentasjonsbehov =
          oppdaterDokumentasjonTilEtSvarSpørsmålForBarn(
            søknad.dokumentasjonsbehov,
            spørsmål,
            valgtSvar,
            intl,
            barneid,
            barnepassid
          );
      }

      settSøknad((prevSoknad) => {
        return {
          ...prevSoknad,
          dokumentasjonsbehov: endretDokumentasjonsbehov,
        };
      });
    };

    const settDokumentasjonsbehov = (
      spørsmål: ISpørsmål,
      valgtSvar: ISvar,
      erHuketAv?: boolean
    ) => {
      let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;

      if (spørsmål.flersvar) {
        endretDokumentasjonsbehov = hentDokumentasjonTilFlersvarSpørsmål(
          erHuketAv,
          søknad.dokumentasjonsbehov,
          valgtSvar,
          intl
        );
      } else {
        endretDokumentasjonsbehov = oppdaterDokumentasjonTilEtSvarSpørsmål(
          søknad.dokumentasjonsbehov,
          spørsmål,
          valgtSvar,
          intl
        );
      }

      settSøknad((prevSoknad) => {
        return {
          ...prevSoknad,
          dokumentasjonsbehov: endretDokumentasjonsbehov,
        };
      });
    };

    const oppdaterBarnISøknaden = (oppdatertBarn: IBarn) => {
      settSøknad((prevSøknad) => ({
        ...prevSøknad,
        person: {
          ...prevSøknad.person,
          barn: oppdaterBarnIBarneliste(prevSøknad.person.barn, oppdatertBarn),
        },
      }));
    };

    const oppdaterFlereBarnISøknaden = (oppdaterteBarn: IBarn[]) => {
      settSøknad((prevSøknad) => ({
        ...prevSøknad,
        person: {
          ...prevSøknad.person,
          barn: oppdaterBarneliste(prevSøknad.person.barn, oppdaterteBarn),
        },
      }));
    };

    return {
      søknad,
      settSøknad,
      settDokumentasjonsbehov,
      settDokumentasjonsbehovForBarn,
      mellomlagretBarnetilsyn,
      hentMellomlagretBarnetilsyn,
      mellomlagreBarnetilsyn,
      brukMellomlagretBarnetilsyn,
      hentForrigeSøknadBarnetilsyn,
      nullstillMellomlagretBarnetilsyn,
      nullstillSøknadBarnetilsyn,
      oppdaterBarnISøknaden,
      oppdaterFlereBarnISøknaden,
    };
  }
);

export { BarnetilsynSøknadProvider, useBarnetilsynSøknad };
