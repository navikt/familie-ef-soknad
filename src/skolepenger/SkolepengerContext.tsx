import { useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../mock/initialState.json';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
} from '../helpers/steg/dokumentasjon';
import {
  hentMellomlagretSkolepengerFraDokument,
  mellomlagreSkolepengerTilDokument,
  nullstillMellomlagretSkolepengerTilDokument,
} from './utils/søknad';
import { IMellomlagretSkolepengerSøknad } from './models/mellomlagretSøknad';
import Environment from '../Environment';
import { useIntl } from 'react-intl';
import { hentUid } from '../utils/uuid';
import { nyttTekstFelt } from '../helpers/tommeSøknadsfelter';
import { ISøknad } from './models/søknad';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
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
  utdanning: {
    id: hentUid(),
    skoleUtdanningssted: nyttTekstFelt,
  },
  dokumentasjonsbehov: [],
  harBekreftet: false,
};

const [SkolepengerSøknadProvider, useSkolepengerSøknad] = createUseContext(
  () => {
    const [søknad, settSøknad] = useState<ISøknad>(initialState);

    const [mellomlagretSkolepenger, settMellomlagretSkolepenger] = useState<
      IMellomlagretSkolepengerSøknad
    >();
    const intl = useIntl();

    const hentMellomlagretSkolepenger = (): Promise<void> => {
      return hentMellomlagretSkolepengerFraDokument().then(
        (mellomlagretVersjon?: IMellomlagretSkolepengerSøknad) => {
          if (mellomlagretVersjon) {
            settMellomlagretSkolepenger(mellomlagretVersjon);
          }
        }
      );
    };

    const brukMellomlagretSkolepenger = () => {
      if (mellomlagretSkolepenger) {
        settSøknad(mellomlagretSkolepenger.søknad);
      }
    };

    const mellomlagreSkolepenger = (steg: string) => {
      const utfyltSøknad = {
        søknad: søknad,
        modellVersjon: Environment().modellVersjon.skolepenger,
        gjeldendeSteg: steg,
      };
      mellomlagreSkolepengerTilDokument(utfyltSøknad);
      settMellomlagretSkolepenger(utfyltSøknad);
    };

    const nullstillMellomlagretSkolepenger = (): Promise<any> => {
      return nullstillMellomlagretSkolepengerTilDokument();
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
      mellomlagretSkolepenger,
      hentMellomlagretSkolepenger,
      mellomlagreSkolepenger,
      brukMellomlagretSkolepenger,
      nullstillMellomlagretSkolepenger,
    };
  }
);

export { SkolepengerSøknadProvider, useSkolepengerSøknad };
