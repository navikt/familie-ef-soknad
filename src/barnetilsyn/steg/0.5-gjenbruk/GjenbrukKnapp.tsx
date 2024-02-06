import LocaleTekst from '../../../language/LocaleTekst';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useContext } from 'react';
import { GjenbrukContext } from '../../../context/GjenbrukContext';

export const GjenbrukKnapp: React.FC<{
  nesteSide: string;
  tekst: string;
}> = ({ nesteSide, tekst }) => {
  const navigate = useNavigate();
  const { skalGjenbrukeSøknad, settSkalGjenbrukeSøknad } =
    useContext(GjenbrukContext);
  const handleButtonClick = () => {
    settSkalGjenbrukeSøknad();
    navigate(nesteSide);
  };

  return (
    <FeltGruppe classname={'sentrert'} aria-live="polite">
      <Button onClick={() => handleButtonClick()} variant="primary">
        {/* <LocaleTekst tekst={'knapp.start'} /> */}
        {tekst}
      </Button>
    </FeltGruppe>
  );
};
