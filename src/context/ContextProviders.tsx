import React from 'react';
import { PersonProvider } from './PersonContext';
import { SøknadProvider } from './SøknadContext';
import { TogglesProvider } from './TogglesContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <TogglesProvider>
      <PersonProvider>
        <SøknadProvider>{children}</SøknadProvider>
      </PersonProvider>
    </TogglesProvider>
  );
};

export default ContextProviders;
