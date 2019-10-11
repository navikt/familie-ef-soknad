import React from 'react';
import { SpørsmålProvider } from './SpørsmålContext';

const ContextProviders: React.FC = ({ children }) => {
  console.log('kake');
  return <h1>cake</h1>;
  return <SpørsmålProvider>{children}</SpørsmålProvider>;
};

export default ContextProviders;
