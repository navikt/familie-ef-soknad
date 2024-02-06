import React, { createContext, useState, ReactNode } from 'react';

export const GjenbrukContext = createContext<{
  skalGjenbrukeSøknad: boolean;
  settSkalGjenbrukeSøknad: (verdi?: boolean) => void;
}>({
  skalGjenbrukeSøknad: false,
  settSkalGjenbrukeSøknad: () => {},
});

export const GjenbrukProvider = ({ children }: { children: ReactNode }) => {
  const [skalGjenbrukeSøknad, settSkalGjenbrukeSøknad] = useState(false);

  const toggleGjenbrukSøknad = () => {
    settSkalGjenbrukeSøknad((prevGjenbrukSøknad) => !prevGjenbrukSøknad);
  };

  return (
    <GjenbrukContext.Provider
      value={{
        skalGjenbrukeSøknad,
        settSkalGjenbrukeSøknad: toggleGjenbrukSøknad,
      }}
    >
      {children}
    </GjenbrukContext.Provider>
  );
};
