import { useState } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import { dagensDato } from '../utils/dato';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import personIngenBarn from '../mock/personIngenBarn.json';
import { ESituasjon } from '../models/steg/dinsituasjon/meromsituasjon';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
  person: personIngenBarn,
  sivilstatus: {},
  medlemskap: {},
  bosituasjon: {
    delerBoligMedAndreVoksne: {
      spørsmålid: 'søkerDelerBoligMedAndreVoksne',
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
    søknadsdato: { label: '', verdi: dagensDato },
  },
  dokumentasjonsbehov: [],
  vedleggsliste: [],
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);

  return { søknad, settSøknad };
});

export { SøknadProvider, useSøknad };
