import { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components/macro';
import { BodyShort, Heading } from '@navikt/ds-react';

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
      <KomponentGruppe>
        <Lenke href={'https://www.nav.no/familie/alene-med-barn/barnetilsyn'}>
          <BodyShort>
            <LocaleTekst
              tekst={'kvittering.lenke.tilleggsstønader.aktivitetskrav'}
            />
          </BodyShort>
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
