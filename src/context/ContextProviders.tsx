import React from 'react';
import { SøknadProvider } from './SøknadContext';
import { PersonProvider } from './PersonContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <PersonProvider>
      <SøknadProvider>{children}</SøknadProvider>
    </PersonProvider>
  );
};

export default ContextProviders;
