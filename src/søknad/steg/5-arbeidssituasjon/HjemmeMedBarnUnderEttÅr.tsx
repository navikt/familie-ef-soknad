import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const HjemmeMedBarnUnderEttÅr: React.FC<{ erValgt: boolean }> = ({
  erValgt,
}) => {
  return (
    <>
      {erValgt ? (
        <KomponentGruppe>
          <AlertStripeInfo className="fjernBakgrunn">
            <LocaleTekst
              tekst={'arbeidssituasjon.alert.aktivitetspliktFraEttÅr'}
            />
          </AlertStripeInfo>
        </KomponentGruppe>
      ) : null}
    </>
  );
};

export default HjemmeMedBarnUnderEttÅr;
