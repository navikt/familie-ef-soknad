import { useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../../mock/initialState.json';
import { ISpørsmål, ISvar } from '../../models/spørsmålogsvar';
import { ISøknad } from '../../models/søknad';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
} from '../../helpers/steg/dokumentasjon';
import {
  hentMellomlagretOvergangsstønadFraDokument,
  mellomlagreOvergangsstønadTilDokument,
  nullstillMellomlagretOvergangsstønadTilDokument,
} from '../../utils/søknad';
import { IMellomlagretOvergangsstønad } from '../../models/mellomlagretSøknad';
import Environment from '../../Environment';
import { useIntl } from 'react-intl';

// -----------  CONTEXT  -----------
const initialState: any = {
  person: tomPerson,
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  const [søknad, settSøknad] = useState<any>(initialState);
  const [
    mellomlagretOvergangsstønad,
    settMellomlagretOvergangsstønad,
  ] = useState<IMellomlagretOvergangsstønad>();
  const intl = useIntl();

  const hentMellomlagretOvergangsstønad = (): Promise<void> => {
    return hentMellomlagretOvergangsstønadFraDokument().then(
      (mellomlagretVersjon?: IMellomlagretOvergangsstønad) => {
        if (mellomlagretVersjon) {
          settMellomlagretOvergangsstønad(mellomlagretVersjon);
        }
      }
    );
  };

  const brukMellomlagretOvergangsstønad = () => {
    if (mellomlagretOvergangsstønad) {
      settSøknad(mellomlagretOvergangsstønad.søknad);
    }
  };

  const mellomlagreOvergangsstønad = (steg: string) => {
    const utfyltSøknad = {
      søknad: søknad,
      modellVersjon: Environment().modellVersjon,
      gjeldendeSteg: steg,
    };
    mellomlagreOvergangsstønadTilDokument(utfyltSøknad);
    settMellomlagretOvergangsstønad(utfyltSøknad);
  };

  const nullstillMellomlagretOvergangsstønad = (): Promise<any> => {
    return nullstillMellomlagretOvergangsstønadTilDokument();
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

    settSøknad({ ...søknad, dokumentasjonsbehov: endretDokumentasjonsbehov });
  };

  return {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagretOvergangsstønad,
    hentMellomlagretOvergangsstønad,
    mellomlagreOvergangsstønad,
    brukMellomlagretOvergangsstønad,
    nullstillMellomlagretOvergangsstønad,
  };
});

export { SøknadProvider, useSøknad };
