import { useReducer } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';

// ----------- MODELS -----------
export enum SøknadActionType {
  settSøknad = 'settSøknad',
  settMedlemskap = 'settMedlemskap',
}

export type IAction = {
  type: SøknadActionType;
  payload: ISøknad;
};

// ----------- REDUCER -----------
const reducer = (state: ISøknad, action: IAction): ISøknad => {
  const søknad: ISøknad = action.payload;
  const {
    søkerOppholderSegINorge,
    søkerBosattINorgeSisteTreÅr,
    søkerErFlyktning,
  } = søknad;

  switch (action.type) {
    case SøknadActionType.settSøknad: {
      return { ...søknad };
    }

    case SøknadActionType.settMedlemskap: {
      return {
        ...søknad,
        søkerOppholderSegINorge: søkerOppholderSegINorge,
        søkerBosattINorgeSisteTreÅr: søkerBosattINorgeSisteTreÅr,
        søkerErFlyktning: søkerErFlyktning,
      };
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

  const settMedlemskap = (søknad: ISøknad) => {
    dispatch({ type: SøknadActionType.settMedlemskap, payload: søknad });
  };
  return { søknad, settSøknad, settMedlemskap };
};

export default createUseContext(useSøknad);
