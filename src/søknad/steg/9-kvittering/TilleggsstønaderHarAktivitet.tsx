import React, { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';

const StyledBeskrivelse = styled.div`
  .typo-normal {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const TilleggsstønaderHarAktivitet: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst
            tekst={'kvittering.tittel.tilleggsstønader.aktivitetskrav'}
          />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <StyledBeskrivelse>
          <Normaltekst>
            <LocaleTekst
              tekst={'kvittering.beskrivelse.tilleggsstønader.aktivitetskrav'}
            />
          </Normaltekst>
        </StyledBeskrivelse>
      </FeltGruppe>
      <KomponentGruppe>
        <Lenke href={'https://www.nav.no/familie/alene-med-barn/barnetilsyn'}>
          <Normaltekst>
            <LocaleTekst
              tekst={'kvittering.lenke.tilleggsstønader.aktivitetskrav'}
            />
          </Normaltekst>
        </Lenke>
      </KomponentGruppe>
      <KomponentGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={
            'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far#NAV150002'
          }
        >
          <LocaleTekst
            tekst={'kvittering.knapp.tilleggsstønader.aktivitetskrav'}
          />
        </a>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default TilleggsstønaderHarAktivitet;
