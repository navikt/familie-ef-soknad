import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../mock/initialState.json';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../models/felles/spørsmålogsvar';
import { ISøknad, ForrigeSøknad } from './models/søknad';
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
  mellomlagreSøknadTilDokument,
  nullstillMellomlagretSøknadTilDokument,
} from '../utils/søknad';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IPerson } from '../models/søknad/person';
import { IBarn } from '../models/steg/barn';
import { hvaErDinArbeidssituasjonSpm } from './steg/5-aktivitet/AktivitetConfig';
import { useSpråkContext } from '../context/SpråkContext';
import { LokalIntlShape } from '../language/typer';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { oppdaterBarneliste, oppdaterBarnIBarneliste } from '../utils/barn';
import { usePersonContext } from '../context/PersonContext';

// -----------  CONTEXT  -----------
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

    const { person } = usePersonContext();

    useEffect(() => {
      if (
        mellomlagretBarnetilsyn?.locale &&
        mellomlagretBarnetilsyn?.locale !== locale
      ) {
        setLocale(mellomlagretBarnetilsyn.locale);
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
      return hentDataFraForrigeBarnetilsynSøknad().then(
        (tidligereVersjon?: ForrigeSøknad) => {
          if (tidligereVersjon) {
            settSøknad((prevSøknad) => ({
              ...prevSøknad,
              ...tidligereVersjon,
            }));
          }
        }
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
