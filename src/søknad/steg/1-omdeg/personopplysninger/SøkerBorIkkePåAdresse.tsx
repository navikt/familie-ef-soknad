import React, { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';

interface Props {
  stønadstype: Stønadstype;
}

const lenkerPDFSøknad = {
  [Stønadstype.overgangsstønad]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/dokumentinnsending',
  [Stønadstype.barnetilsyn]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.02/dokumentinnsending',
  [Stønadstype.skolepenger]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.04/dokumentinnsending',
};

const SøkerBorIkkePåAdresse: FC<Props> = ({ stønadstype }) => {
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
            <Lenke href={lenkerPDFSøknad[stønadstype]}>
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
