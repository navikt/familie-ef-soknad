import React, { createContext, useState, useContext } from 'react';

const SvarContext = createContext({});

const useSvarContext = () => useContext(SvarContext);

const SvarProvider: React.FC<any> = ({ children }) => {
  const [svar, settSvar] = useState<any>([]);

  return (
    <SvarContext.Provider value={[svar, settSvar]}>
      {children}
    </SvarContext.Provider>
  );
};

export { useSvarContext, SvarProvider };
