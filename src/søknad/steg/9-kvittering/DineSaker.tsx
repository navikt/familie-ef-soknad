import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const DineSaker: FC = () => {
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Normaltekst>
          <LocaleTekst tekst={'kvittering.tekst.dineSaker'} />
        </Normaltekst>
      </KomponentGruppe>
      {false && (
        <KomponentGruppe>
          <a className={'knapp knapp--standard kvittering'} href={''}>
            <LocaleTekst tekst={'kvittering.knapp.dineSaker'} />
          </a>
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default DineSaker;
