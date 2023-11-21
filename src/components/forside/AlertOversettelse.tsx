import { Alert } from '@navikt/ds-react';
import { useSpråkContext } from '../../context/SpråkContext';
import LocaleTekst from '../../language/LocaleTekst';

export const OversettelseAlert = () => {
  const [locale] = useSpråkContext();

  if (locale === 'en') {
    return (
      <Alert size="small" variant="warning">
        <LocaleTekst tekst={'alert.warning.oversettingUnderArbeid'} />
      </Alert>
    );
  }

  return <></>;
};
