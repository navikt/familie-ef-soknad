import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const HjemmeMedBarnUnderEttÅr: React.FC = () => {
  return (
    <>
      <KomponentGruppe>
        <AlertStripeInfo className="fjernBakgrunn">
          <LocaleTekst
            tekst={'arbeidssituasjon.alert.aktivitetspliktFraEttÅr'}
          />
        </AlertStripeInfo>
      </KomponentGruppe>
    </>
  );
};

export default HjemmeMedBarnUnderEttÅr;
