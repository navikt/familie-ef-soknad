import React, { createContext, useState, useContext } from 'react';

interface SpråkProps {
  local: string;
  messages: {};
}

const SpråkContext = createContext({});

const useSpråkContext = () => useContext(SpråkContext);

const SpråkProvider: React.FC<SpråkProps> = ({ children }) => {
  const [locale, setLocale] = useState('');

  return (
    <SpråkContext.Provider value={[locale, setLocale]}>
      {children}
    </SpråkContext.Provider>
  );
};

export { useSpråkContext, SpråkProvider };
