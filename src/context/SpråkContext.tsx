import React, { createContext, useContext, useState } from 'react';
import { getMessages } from '../language/utils';
import { LocaleType } from '../language/typer';
import { LokalIntlProvider } from './LokalIntlContext';

const SpråkContext = createContext<any>(['', () => {}]);
const useSpråkContext = () => useContext(SpråkContext);

const SpråkProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(LocaleType.nb);
  const tekster = getMessages(locale);
  SpråkContext.displayName = 'SPRÅK_CONTEXT';

  return (
    <SpråkContext.Provider value={[locale, setLocale]}>
      <LokalIntlProvider tekster={tekster}>{children}</LokalIntlProvider>
    </SpråkContext.Provider>
  );
};

export { useSpråkContext, SpråkProvider };
