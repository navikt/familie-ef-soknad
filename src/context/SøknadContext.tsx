import { useReducer } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';

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
  fnr: '220384 12345',
  fornavn: 'Lise',
  etternavn: 'Nordmann',
  statsborgerskap: 'Norsk',
  adresse: 'Gateveien 1, 1234',
  telefonnr: '',
  søkerOppholderSegINorge: undefined,
  søkerBosattINorgeSisteTreÅr: undefined,
  søkerErFlyktning: undefined,
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
