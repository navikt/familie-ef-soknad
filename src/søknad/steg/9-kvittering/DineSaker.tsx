import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';

const DineSaker: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={'kvittering.tekst.dineSaker'} />
        </Normaltekst>
      </FeltGruppe>
      <a
        className={'knapp knapp--standard kvittering'}
        href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
      >
        <LocaleTekst tekst={'kvittering.knapp.dineSaker'} />
      </a>
    </SeksjonGruppe>
  );
};

export default DineSaker;
