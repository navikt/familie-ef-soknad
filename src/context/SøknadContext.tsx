import { useReducer } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import mockPerson from '../mock/person.json';

// ----------- ACTIONS & TYPES -----------
export enum SøknadActionType {
  settSøknad = 'settSøknad',
}

export type IAction = {
  type: SøknadActionType;
  payload: ISøknad;
};

// ----------- REDUCER -----------
const reducer = (state: ISøknad, action: IAction): ISøknad => {
  const søknad: ISøknad = action.payload;

  switch (action.type) {
    case SøknadActionType.settSøknad: {
      return { ...søknad };
    }

    default:
      return søknad;
  }
};

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
  vedleggsliste: [],
};

const useSøknad = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const søknad = state;

  const settSøknad = (søknad: ISøknad) => {
    dispatch({ type: SøknadActionType.settSøknad, payload: søknad });
  };

  return { søknad, settSøknad };
};

export default createUseContext(useSøknad);
