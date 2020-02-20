import { useState } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import mockPerson from '../mock/person.json';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
  person: mockPerson,
  sivilstatus: {},
  medlemskap: {},
  bosituasjon: {
    søkerDelerBoligMedAndreVoksne: {
      label: '',
      verdi: '',
    },
  },
  arbeidssituasjon: { situasjon: { label: '', verdi: [] } },
  vedleggsliste: [],
};

const useSøknad = () => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);

  return { søknad, settSøknad };
};

export default createUseContext(useSøknad);
