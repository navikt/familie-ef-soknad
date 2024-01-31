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
  hentFeltObjekt,
  hentMellomlagretSøknadFraDokument,
  hentPersonData,
  hentTekst,
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
import { resetForelder } from '../helpers/steg/forelder';

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
                  const barnFraPersonData =
                    overskrivBarnFraForrigeSøknadMedPersonData(
                      barn,
                      personData
                    );

                  const medforelder = finnGjeldendeBarnOgLagMedforelderFelt(
                    barn,
                    personData
                  );

                  const forelder = oppdaterBarnForelderIdentOgNavn(
                    barn.forelder,
                    medforelder
                  );

                  const oppdatertForelder =
                    finnGjeldendeBarnOgNullstillAnnenForelderHvisDødEllerNy(
                      barn,
                      personData,
                      forelder
                    );

                  const fraFolkeregister = lagFraFolkeregisterVerdi(
                    prevSøknad,
                    barn
                  );

                  return {
                    ...barn,
                    ...barnFraPersonData,
                    medforelder,
                    forelder: oppdatertForelder,
                    fraFolkeregister: fraFolkeregister,
                    erFraForrigeSøknad: true,
                  };
                }),
                ...finnNyeBarnSidenForrigeSøknad(prevSøknad, forrigeSøknad),
              ],
            },
          };
        });
      }
    };

    const lagFraFolkeregisterVerdi = (søknad: ISøknad, barn: IBarn) => {
      return søknad.person.barn.find(
        (prevBarn) => prevBarn.ident.verdi === barn.ident.verdi
      )?.forelder?.fraFolkeregister;
    };

    const oppdaterBarnForelderIdentOgNavn = (
      forelder: IForelder | undefined,
      medforelder: IMedforelderFelt | undefined
    ): IForelder => {
      if (medforelder) {
        return {
          ...forelder,
          navn: hentFeltObjekt('person.navn', medforelder.verdi.navn, intl),
          ident: hentFeltObjekt(
            'person.ident.visning',
            medforelder.verdi.ident,
            intl
          ),
          id: hentUid(),
        };
      } else {
        return {
          ...forelder,
        };
      }
    };

    const overskrivBarnFraForrigeSøknadMedPersonData = (
      barn: IBarn,
      personData: PersonData
    ): IBarn | undefined => {
      const gjeldendeBarn = personData.barn.find(
        (personBarn) => personBarn.fnr === barn.ident.verdi
      );

      if (!gjeldendeBarn) return undefined;

      return {
        id: hentUid(),
        fnr: gjeldendeBarn.fnr,
        fødselsdato: {
          label: hentTekst('barnekort.fødselsdato', intl),
          verdi: gjeldendeBarn.fødselsdato,
        },
        harAdressesperre: gjeldendeBarn.harAdressesperre,
        harSammeAdresse: {
          label: hentTekst('barnekort.spm.sammeAdresse', intl),
          verdi: gjeldendeBarn.harSammeAdresse,
        },
        ident: {
          label: hentTekst('barn.ident', intl),
          verdi: gjeldendeBarn.fnr,
        },
        navn: {
          label: hentTekst('person.navn', intl),
          verdi: gjeldendeBarn.navn,
        },
        alder: {
          label: hentTekst('barnekort.alder', intl),
          verdi: gjeldendeBarn.alder.toString(),
        },
      };
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

    const finnGjeldendeBarnOgNullstillAnnenForelderHvisDødEllerNy = (
      barn: IBarn,
      personData: PersonData,
      forelder: IForelder
    ): IForelder => {
      const gjeldendeBarn = personData.barn.find(
        (personBarn) => personBarn.fnr === barn.ident.verdi
      );

      const nyForelder = gjeldendeBarn?.medforelder?.ident !== forelder?.ident;

      const nyForelderIdentOgNavn = {
        ident: {
          label: hentTekst('person.fnr', intl),
          verdi: gjeldendeBarn?.medforelder?.ident
            ? gjeldendeBarn?.medforelder?.ident
            : '',
        },
        navn: {
          label: hentTekst('person.navn', intl),
          verdi: gjeldendeBarn?.medforelder?.navn
            ? gjeldendeBarn?.medforelder?.navn
            : '',
        },
      };

      if (gjeldendeBarn?.medforelder?.død === true || nyForelder) {
        resetForelder(forelder);
        if (nyForelder) {
          return {
            ...nyForelderIdentOgNavn,
          };
        }
        return {};
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
