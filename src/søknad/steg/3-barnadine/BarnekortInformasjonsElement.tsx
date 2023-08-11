import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';

export const InformasjonsElement: React.FC<{
  forklaringId: string;
  verdi: string | null;
}> = ({ forklaringId, verdi }) => {
  const intl = useLokalIntlContext();

  return (
    <div>
      <BodyShort>{intl.formatMessage({ id: forklaringId })}</BodyShort>
      <BodyShort>{verdi}</BodyShort>
    </div>
  );
};
