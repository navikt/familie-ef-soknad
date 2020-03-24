import React, { createContext, useContext, useReducer } from 'react';
import { IPerson } from '../models/person';
import mockPerson from '../mock/person.json';
import personIngenBarn from '../mock/personIngenBarn.json';

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
const initialState: IPerson = personIngenBarn;

const PersonContext = createContext<{
  person: IPerson;
  settPerson: (action: IPersonAction) => void;
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
