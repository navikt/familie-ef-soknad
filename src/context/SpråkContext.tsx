import React, { createContext, useState, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { getMessages } from '../utils/språk';

const SpråkContext = createContext<any>(['', () => {}]);
const useSpråkContext = () => useContext(SpråkContext);

const SpråkProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<string>('nb');
  const tekster = getMessages(locale);

  return (
    <SpråkContext.Provider value={[locale, setLocale]}>
      <IntlProvider locale={locale} messages={tekster}>
        {children}
      </IntlProvider>
    </SpråkContext.Provider>
  );
};

export { useSpråkContext, SpråkProvider };
