import React, { createContext, useContext, useReducer } from 'react';
import { IPerson } from '../models/søknad/person';
import tomPerson from '../mock/initialState.json';

// ----------- ACTIONS & TYPES -----------
export enum PersonActionTypes {
  HENT_PERSON = 'HENT_PERSON',
}

type IPersonAction = {
  type: PersonActionTypes;
  payload: IPerson;
};

// ----------- REDUCER -----------
const reducer = (state: IPerson, action: IPersonAction) => {
  const person: IPerson = action.payload;

  switch (action.type) {
    case PersonActionTypes.HENT_PERSON: {
      return { ...person };
    }

    default:
      return state;
  }
};

// -----------  CONTEXT  -----------
const initialState: IPerson = tomPerson;

const PersonContext = createContext<{
  person: IPerson;
  settPerson: (action: IPersonAction) => void;
}>({
  person: initialState,
  settPerson: () => {},
});

const usePersonContext = () => useContext(PersonContext);
const PersonProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  PersonProvider.displayName = 'PERSON_PROVIDER';
  const [person, settPerson] = useReducer(reducer, initialState);
  const value = { person, settPerson };
  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export { usePersonContext, PersonProvider };
