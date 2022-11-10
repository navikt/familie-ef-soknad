import { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components/macro';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { BodyShort, Heading } from '@navikt/ds-react';

const StyledBeskrivelse = styled.div`
  .navds-body-short {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const RegistrerDegSomArbeidssøker: FC<{ stønadstype: Stønadstype }> = ({
  stønadstype,
}) => {
  const intl = useLokalIntlContext();
  return (
    <SeksjonGruppe>
      {stønadstype === Stønadstype.overgangsstønad && (
        <>
          <FeltGruppe>
            <Heading size="small" level="4">
              <LocaleTekst tekst={'kvittering.tittel.skolepenger'} />
            </Heading>
          </FeltGruppe>
          <FeltGruppe>
            <BodyShort>
              {hentTekst('kvittering.tekst.skolepenger', intl)}
            </BodyShort>
          </FeltGruppe>
          <KomponentGruppe>
            <BodyShort>
              <Lenke
                href={'https://www.nav.no/familie/alene-med-barn/skolepenger'}
              >
                {hentTekst('kvittering.lenke.skolepenger', intl)}
              </Lenke>
            </BodyShort>
          </KomponentGruppe>
          <KomponentGruppe>
            <a
              className={'knapp knapp--standard kvittering'}
              href={
                'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.04/dokumentinnsending'
              }
            >
              <LocaleTekst tekst={'kvittering.knapp.skolepenger'} />
            </a>
          </KomponentGruppe>
        </>
      )}
      <FeltGruppe>
        <Heading size="small" level="4">
          <LocaleTekst tekst={'kvittering.tittel.tilleggsstønader'} />
        </Heading>
      </FeltGruppe>

      <FeltGruppe>
        <StyledBeskrivelse>
          <BodyShort>
            <LocaleTekst tekst={'kvittering.beskrivelse.tilleggsstønader'} />
          </BodyShort>
        </StyledBeskrivelse>
      </FeltGruppe>

      <KomponentGruppe>
        <Lenke
          href={'https://www.nav.no/familie/alene-med-barn/tilleggsstonader'}
        >
          <BodyShort>
            <LocaleTekst tekst={'kvittering.lenke.tilleggsstønader'} />
          </BodyShort>
        </Lenke>
      </KomponentGruppe>

      <KomponentGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
        >
          <LocaleTekst tekst={'kvittering.knapp.tilleggsstønader'} />
        </a>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default RegistrerDegSomArbeidssøker;
