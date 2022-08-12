import { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { BodyShort } from '@navikt/ds-react';

const RegistrerDegSomArbeidssøker: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <BodyShort>
          <LocaleTekst tekst={'kvittering.tekst.arbeidssøker'} />
        </BodyShort>
      </FeltGruppe>
      <a
        className={'knapp knapp--standard kvittering'}
        href={'https://arbeidssokerregistrering.nav.no/'}
      >
        <LocaleTekst tekst={'kvittering.knapp.arbeidssøker'} />
      </a>
    </SeksjonGruppe>
  );
};

export default RegistrerDegSomArbeidssøker;
