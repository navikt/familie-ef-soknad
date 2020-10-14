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

const TilleggsstønaderArbeidssøker: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst
            tekst={'kvittering.tittel.tilleggsstønader.arbeidssøker'}
          />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <StyledBeskrivelse>
          <Normaltekst>
            <LocaleTekst
              tekst={'kvittering.beskrivelse.tilleggsstønader.arbeidssøker'}
            />
          </Normaltekst>
        </StyledBeskrivelse>
      </FeltGruppe>
      <KomponentGruppe>
        <Lenke
          href={
            'https://www.nav.no/no/person/familie/enslig-mor-eller-far/tilleggsstonader-og-stonad-til-skolepenger'
          }
        >
          <Normaltekst>
            <LocaleTekst
              tekst={'kvittering.lenke.tilleggsstønader.arbeidssøker'}
            />
          </Normaltekst>
        </Lenke>
      </KomponentGruppe>
      <KomponentGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
        >
          <LocaleTekst
            tekst={'kvittering.knapp.tilleggsstønader.arbeidssøker'}
          />
        </a>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default TilleggsstønaderArbeidssøker;
