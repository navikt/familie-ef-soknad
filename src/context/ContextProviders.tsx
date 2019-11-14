import React from 'react';
import useSøknadContext from './SøknadContext';
import { PersonProvider } from './PersonContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <PersonProvider>
      <useSøknadContext.Provider>{children}</useSøknadContext.Provider>
    </PersonProvider>
  );
};

export default ContextProviders;
