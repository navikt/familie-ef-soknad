import { useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../mock/initialState.json';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../models/felles/spørsmålogsvar';
import { ISøknad } from './models/søknad';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmålForBarn,
} from '../helpers/steg/dokumentasjon';
import { IMellomlagretBarnetilsynSøknad } from './models/mellomlagretSøknad';
import Environment from '../Environment';
import { useIntl } from 'react-intl';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import {
  hentMellomlagretSøknadFraDokument,
  mellomlagreSøknadTilDokument,
  nullstillMellomlagretSøknadTilDokument,
} from '../utils/søknad';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IPerson } from '../models/søknad/person';
import { IBarn } from '../models/steg/barn';

// -----------  CONTEXT  -----------
const initialState = (): ISøknad => {
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
      },
    },
    dokumentasjonsbehov: [],
    harBekreftet: false,
  };
};

const [BarnetilsynSøknadProvider, useBarnetilsynSøknad] = createUseContext(
  () => {
    const [søknad, settSøknad] = useState<ISøknad>(initialState());

    const [mellomlagretBarnetilsyn, settMellomlagretBarnetilsyn] = useState<
      IMellomlagretBarnetilsynSøknad
    >();
    const intl = useIntl();

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

    const mellomlagreBarnetilsyn = (steg: string) => {
      const utfyltSøknad = {
        søknad: søknad,
        modellVersjon: Environment().modellVersjon.barnetilsyn,
        gjeldendeSteg: steg,
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
        ...initialState(),
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
        endretDokumentasjonsbehov = oppdaterDokumentasjonTilEtSvarSpørsmålForBarn(
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

    return {
      søknad,
      settSøknad,
      settDokumentasjonsbehov,
      settDokumentasjonsbehovForBarn,
      mellomlagretBarnetilsyn,
      hentMellomlagretBarnetilsyn,
      mellomlagreBarnetilsyn,
      brukMellomlagretBarnetilsyn,
      nullstillMellomlagretBarnetilsyn,
      nullstillSøknadBarnetilsyn,
    };
  }
);

export { BarnetilsynSøknadProvider, useBarnetilsynSøknad };
