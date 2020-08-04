import React from 'react';
import { PersonProvider } from './PersonContext';
import { SøknadProvider } from './SøknadContext';
import { TogglesProvider } from './TogglesContext';
import { BarnetilsynSøknadProvider } from '../barnetilsyn/BarnetilsynContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <TogglesProvider>
      <PersonProvider>
        <SøknadProvider>
          <BarnetilsynSøknadProvider>{children}</BarnetilsynSøknadProvider>
        </SøknadProvider>
      </PersonProvider>
    </TogglesProvider>
  );
};

export default ContextProviders;
