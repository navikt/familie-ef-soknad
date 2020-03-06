import { useState } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import mockPerson from '../mock/person.json';
import { nyttTekstListeFelt } from '../utils/søknadsfelter';

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
  aktivitet: { hvaErDinArbeidssituasjon: { label: '', verdi: [] } },
  merOmDinSituasjon: { gjelderDetteDeg: nyttTekstListeFelt },
  vedleggsliste: [],
};

const useSøknad = () => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);

  return { søknad, settSøknad };
};

export default createUseContext(useSøknad);
