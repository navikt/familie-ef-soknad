import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../gruppe/FeltGruppe';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';

export const StartSøknadKnapp: React.FC<{ nesteSide: string }> = ({
  nesteSide,
}) => {
  const navigate = useNavigate();
  return (
    <FeltGruppe classname={'sentrert'} aria-live="polite">
      <Button onClick={() => navigate(nesteSide)} variant="primary">
        <LocaleTekst tekst={'knapp.start'} />
      </Button>
    </FeltGruppe>
  );
};
