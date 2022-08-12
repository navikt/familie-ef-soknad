import { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components/macro';
import { BodyShort, Heading } from '@navikt/ds-react';

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
        <Heading size="small">
          <LocaleTekst
            tekst={'kvittering.tittel.tilleggsstønader.arbeidssøker'}
          />
        </Heading>
      </FeltGruppe>
      <FeltGruppe>
        <StyledBeskrivelse>
          <BodyShort>
            <LocaleTekst
              tekst={'kvittering.beskrivelse.tilleggsstønader.arbeidssøker'}
            />
          </BodyShort>
        </StyledBeskrivelse>
      </FeltGruppe>
      <KomponentGruppe>
        <Lenke href={'https://www.nav.no/familie/alene-med-barn/skolepenger'}>
          <BodyShort>
            <LocaleTekst
              tekst={'kvittering.lenke.tilleggsstønader.arbeidssøker'}
            />
          </BodyShort>
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
