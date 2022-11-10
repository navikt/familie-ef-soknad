import { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import styled from 'styled-components/macro';
import { BodyShort, Heading, Link } from '@navikt/ds-react';

const StyledBeskrivelse = styled.div`
  .navds-body-short {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const TilleggsstønaderHarAktivitet: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Heading size="small">
          <LocaleTekst
            tekst={'kvittering.tittel.tilleggsstønader.aktivitetskrav'}
          />
        </Heading>
      </FeltGruppe>
      <FeltGruppe>
        <StyledBeskrivelse>
          <BodyShort>
            <LocaleTekst
              tekst={'kvittering.beskrivelse.tilleggsstønader.aktivitetskrav'}
            />
          </BodyShort>
        </StyledBeskrivelse>
      </FeltGruppe>
      <BodyShort>
        <Link href={'https://www.nav.no/familie/alene-med-barn/barnetilsyn'}>
          <LocaleTekst
            tekst={'kvittering.lenke.tilleggsstønader.aktivitetskrav'}
          />
        </Link>
      </BodyShort>
      <BodyShort>
        <Link
          href={
            'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far#NAV150002'
          }
        >
          <LocaleTekst
            tekst={'kvittering.knapp.tilleggsstønader.aktivitetskrav'}
          />
        </Link>
      </BodyShort>
    </SeksjonGruppe>
  );
};

export default TilleggsstønaderHarAktivitet;
