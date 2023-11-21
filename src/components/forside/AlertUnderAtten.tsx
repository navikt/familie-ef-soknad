import React from 'react';
import LocaleTekst from '../../language/LocaleTekst';
import { Alert } from '@navikt/ds-react';

export const AlertUnderAtten: React.FC = () => {
  return (
    <div className="ie-feil">
      <Alert size="small" variant="error">
        <LocaleTekst tekst={'side.alert.ikkeGammelNok'} />
      </Alert>
    </div>
  );
};
