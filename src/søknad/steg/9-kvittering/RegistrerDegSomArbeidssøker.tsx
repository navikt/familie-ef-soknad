import React, { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

const RegistrerDegSomArbeidssøker: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={'kvittering.tekst.arbeidssøker'} />
        </Normaltekst>
      </FeltGruppe>
      <a
        className={'knapp knapp--standard kvittering'}
        href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
      >
        <LocaleTekst tekst={'kvittering.knapp.arbeidssøker'} />
      </a>
    </SeksjonGruppe>
  );
};

export default RegistrerDegSomArbeidssøker;
