import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

const SøkerBorIkkePåAdresse = () => {
  return (
    <>
      <KomponentGruppe>
        <AlertStripe
          type={'advarsel'}
          form={'inline'}
          className={'avstand-øverst'}
        >
          <LocaleTekst tekst={'personopplysninger.alert.riktigAdresse'} />
        </AlertStripe>
      </KomponentGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'personopplysninger.info.endreAdresse'} />
          </Element>
        </FeltGruppe>
        <FeltGruppe>
          <Normaltekst>
            <Lenke
              href={
                'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/dokumentinnsending'
              }
            >
              <LocaleTekst tekst={'personopplysninger.lenke.pdfskjema'} />
            </Lenke>
          </Normaltekst>
        </FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={'personopplysninger.info.pdfskjema'} />
        </Normaltekst>
      </KomponentGruppe>
    </>
  );
};

export default SøkerBorIkkePåAdresse;
