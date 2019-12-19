import React, { createContext, useState, useContext } from 'react';

const SideContext = createContext([{}, () => {}]);
const useSideContext = () => useContext(SideContext);

const SideProvider: React.FC = ({ children }) => {
  const [side, settAktivSide] = useState<any>([]);

  return (
    <SideContext.Provider value={[side, settAktivSide]}>
      {children}
    </SideContext.Provider>
  );
};

export { useSideContext, SideProvider };
