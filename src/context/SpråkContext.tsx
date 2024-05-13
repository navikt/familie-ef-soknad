import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { onLanguageSelect, setParams } from '@navikt/nav-dekoratoren-moduler';
import { getMessages } from '../language/utils';
import { LocaleType } from '../language/typer';
import { LokalIntlProvider } from './LokalIntlContext';
import { useCookies } from 'react-cookie';

const dekoratorLanguageCookieName = 'decorator-language';

const SpråkContext = createContext<
  [LocaleType, Dispatch<SetStateAction<LocaleType>>]
>([LocaleType.nb, () => {}]);

const useSpråkContext = () => useContext(SpråkContext);

const SpråkProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookie] = useCookies([dekoratorLanguageCookieName]);
  const { [dekoratorLanguageCookieName]: dekoratørSpråk } = cookies;
  const defaultSpråk = (dekoratørSpråk as LocaleType) ?? LocaleType.nb;
  const [locale, setLocale] = useState(defaultSpråk);
  const tekster = getMessages(locale);

  SpråkContext.displayName = 'SPRÅK_CONTEXT';

  useEffect(() => {
    setParams({
      language: defaultSpråk,
    }).then();

    onLanguageSelect((language) => {
      setLocale(language.locale as LocaleType);
      setCookie(dekoratorLanguageCookieName, language.locale);
      document.documentElement.lang = language.locale;
    });
  }, []);

  return (
    <SpråkContext.Provider value={[locale, setLocale]}>
      <LokalIntlProvider tekster={tekster}>{children}</LokalIntlProvider>
    </SpråkContext.Provider>
  );
};

export { useSpråkContext, SpråkProvider };
