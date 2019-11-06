import React, { createContext, useContext, Reducer, useReducer } from 'react';
import { IPerson } from '../models/person';
import mockPerson from '../mock/person.json';

// ACTIONS
export enum ActionType {
  settPerson = 'settPerson',
}

type IAction = {
  type: ActionType;
  payload: IPerson;
};

// REDUCER - similar to redux
const initialState: IPerson = mockPerson;
const reducer: Reducer<IPerson, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.settPerson: {
      return { ...action.payload };
    }

    default:
      throw new Error();
  }
};

// CONTEXT SETUP
const PersonContext = createContext<{
  person: IPerson;
  settPerson: (action: IAction) => void;
}>({
  person: initialState,
  settPerson: () => {},
});

const usePersonContext = () => useContext(PersonContext);
const PersonProvider: React.FC = ({ children }) => {
  const [person, settPerson] = useReducer(reducer, initialState);
  const value = { person, settPerson };
  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export { usePersonContext, PersonProvider };
