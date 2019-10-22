import React from 'react';

const environment = {
  useToggles: process.env.REACT_APP_BRUK_TOGGLES === 'true',
  useAuthentication: process.env.REACT_APP_BRUK_AUTENTISERING === 'true',
};

export const ApplicationEnvironmentContext = React.createContext(environment);
