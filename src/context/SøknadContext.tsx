import { useState } from 'react';
import createUseContext from 'constate';
import personIngenBarn from '../mock/personIngenBarn.json';
import { dagensDatoStreng } from '../utils/dato';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ESituasjon } from '../models/steg/dinsituasjon/meromsituasjon';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { ISøknad } from '../models/søknad';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
} from '../helpers/dokumentasjon';
import {
  hentMellomlagretOvergangsstønadFraDokument,
  mellomlagreOvergangsstønadTilDokument,
  nullstillMellomlagretOvergangsstønadTilDokument,
} from '../utils/søknad';
import { IMellomlagretOvergangsstønad } from '../models/mellomlagretSøknad';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
  person: personIngenBarn,
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
  merOmDinSituasjon: {
    gjelderDetteDeg: {
      spørsmålid: ESituasjon.gjelderDetteDeg,
      svarid: [],
      label: '',
      verdi: [],
    },
    søknadsdato: { label: '', verdi: dagensDatoStreng },
  },
  dokumentasjonsbehov: [],
  vedleggsliste: [],
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);
  const [
    mellomlagretOvergangsstønad,
    settMellomlagretOvergangsstønad,
  ] = useState<IMellomlagretOvergangsstønad>();

  const hentMellomlagretOvergangsstønad = (): Promise<void> => {
    return hentMellomlagretOvergangsstønadFraDokument().then(
      (mellomlagretVersjon?: IMellomlagretOvergangsstønad) => {
        if (mellomlagretVersjon) {
          // TODO: Verifiser at modellen og personHash er gyldig
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
    mellomlagreOvergangsstønadTilDokument({
      søknad: søknad,
      personHash: 'abcdef',
      modellVersjon: 1,
      gjeldendeSteg: steg,
    });
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
        valgtSvar
      );
    } else {
      endretDokumentasjonsbehov = oppdaterDokumentasjonTilEtSvarSpørsmål(
        søknad.dokumentasjonsbehov,
        spørsmål,
        valgtSvar
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
