import { Alert } from '@navikt/ds-react';
import { useSpråkContext } from '../../context/SpråkContext';

export const OversettelseAlert = () => {
  const [locale] = useSpråkContext();

  type LocaleType = 'en' | 'nn';

  const oversettelser: Record<LocaleType, { melding: string }> = {
    en: {
      melding:
        "We are in the process of translating this application. The few missing translations will appear in Norwegian until we've translated them.",
    },
    nn: {
      melding:
        'Me er i gong med å omsetja denne nettsida. Dei få manglande omsetningane vil visast på bokmål fram til me har omsett dei.',
    },
  };

  const oversettelse = oversettelser[locale as LocaleType];

  if (!oversettelse) {
    return null;
  }

  return (
    <Alert size="small" variant="warning">
      {oversettelse.melding}
    </Alert>
  );
};
