import React, { FC } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

const StyledBeskrivelse = styled.div`
  .typo-normal {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const RegistrerDegSomArbeidssøker: FC<{ stønadstype: Stønadstype }> = ({
  stønadstype,
}) => {
  const intl = useIntl();
  return (
    <SeksjonGruppe>
      {stønadstype === Stønadstype.overgangsstønad && (
        <>
          <FeltGruppe>
            <Undertittel>
              <LocaleTekst tekst={'kvittering.tittel.skolepenger'} />
            </Undertittel>
          </FeltGruppe>
          <FeltGruppe>
            <Normaltekst>
              {hentTekst('kvittering.tekst.skolepenger', intl)}
            </Normaltekst>
          </FeltGruppe>
          <KomponentGruppe>
            <Normaltekst>
              <Lenke
                href={
                  'https://www.nav.no/no/person/familie/enslig-mor-eller-far/tilleggsstonader-og-stonad-til-skolepenger'
                }
              >
                {hentTekst('kvittering.lenke.skolepenger', intl)}
              </Lenke>
            </Normaltekst>
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
        <Undertittel>
          <LocaleTekst tekst={'kvittering.tittel.tilleggsstønader'} />
        </Undertittel>
      </FeltGruppe>

      <FeltGruppe>
        <StyledBeskrivelse>
          <Normaltekst>
            <LocaleTekst tekst={'kvittering.beskrivelse.tilleggsstønader'} />
          </Normaltekst>
        </StyledBeskrivelse>
      </FeltGruppe>

      <KomponentGruppe>
        <Lenke
          href={
            'https://www.nav.no/no/person/familie/enslig-mor-eller-far/tilleggsstonader-for-enslig-mor-eller-far-som-tar-utdanning-eller-er-arbeidssoker'
          }
        >
          <Normaltekst>
            <LocaleTekst tekst={'kvittering.lenke.tilleggsstønader'} />
          </Normaltekst>
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
