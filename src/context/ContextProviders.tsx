import React from 'react';
import { SpørsmålProvider } from './SpørsmålContext';
import { SvarProvider } from './SvarContext';

const ContextProviders: React.FC = ({ children }) => {
  return (
    <SpørsmålProvider>
      <SvarProvider>{children}</SvarProvider>
    </SpørsmålProvider>
  );
};

export default ContextProviders;
