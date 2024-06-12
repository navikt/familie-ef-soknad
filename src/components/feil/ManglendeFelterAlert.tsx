import { Alert } from '@navikt/ds-react';
import React from 'react';
import { listManglendeFelter } from '../../utils/validering/validering';

interface ManglendeFelterProps {
  manglendeFelter: string[];
}

const ManglendeFelterAlert: React.FC<ManglendeFelterProps> = ({
  manglendeFelter,
}) => {
  return (
    <Alert size="small" variant="warning">
      Det er felter i søknaden som ikke er fylt ut eller har ugyldig verdi. Gå
      til {listManglendeFelter(manglendeFelter)} for å legge inn gyldige verdier
      før du sender inn søknaden.
    </Alert>
  );
};

export default ManglendeFelterAlert;
