import React, { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { getMessages } from '../language/utils';
import { LocaleType } from '../language/typer';

const SpråkContext = createContext<any>(['', () => {}]);
const useSpråkContext = () => useContext(SpråkContext);

const SpråkProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(LocaleType.nb);
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
