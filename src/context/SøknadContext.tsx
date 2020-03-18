import { useState } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import mockPerson from '../mock/person.json';
import { nyttTekstListeFelt } from '../helpers/tommeSøknadsfelter';
import { dagensDato } from '../utils/dato';

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
  merOmDinSituasjon: {
    gjelderDetteDeg: nyttTekstListeFelt,
    søknadsdato: { label: '', verdi: dagensDato },
  },
  vedleggsliste: [],
};

const useSøknad = () => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);

  return { søknad, settSøknad };
};

const context = createUseContext(useSøknad);
export const SøknadProvider = context.Provider;

export default context;
