import React from 'react';
import { PersonProvider } from './PersonContext';
import { SøknadProvider } from './SøknadContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <PersonProvider>
      <SøknadProvider>{children}</SøknadProvider>
    </PersonProvider>
  );
};

export default ContextProviders;
