import LocaleTekst from '../../../language/LocaleTekst';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

export const KnappNesteSide: React.FC<{
  nesteSide: string;
  tekst: string;
}> = ({ nesteSide, tekst }) => {
  const navigate = useNavigate();
  return (
    <FeltGruppe classname={'sentrert'} aria-live="polite">
      <Button onClick={() => navigate(nesteSide)} variant="primary">
        {/* <LocaleTekst tekst={'knapp.start'} /> */}
        {tekst}
      </Button>
    </FeltGruppe>
  );
};
