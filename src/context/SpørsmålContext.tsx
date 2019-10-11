import React, { createContext, useState, useContext } from 'react';

const SpørsmålContext = createContext({});

const useSpørsmålContext = () => useContext(SpørsmålContext);

const SpørsmålProvider: React.FC<any> = ({ children }) => {
  const [spørsmal, settSpørsmal] = useState<any>([]);

  return (
    <SpørsmålContext.Provider value={[spørsmal, settSpørsmal]}>
      {children}
    </SpørsmålContext.Provider>
  );
};

export { useSpørsmålContext, SpørsmålProvider };
