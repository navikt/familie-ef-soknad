import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const HjemmeMedBarnUnderEttÅr: React.FC = () => {
  return (
    <>
      <KomponentGruppe>
        <AlertStripe type={'info'} form={'inline'}>
          <LocaleTekst
            tekst={'arbeidssituasjon.alert.aktivitetspliktFraEttÅr'}
          />
        </AlertStripe>
      </KomponentGruppe>
    </>
  );
};

export default HjemmeMedBarnUnderEttÅr;
