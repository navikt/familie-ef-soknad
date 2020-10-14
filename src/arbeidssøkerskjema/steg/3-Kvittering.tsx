import React from 'react';
import Side from '../side/Side';
import { useIntl } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { dagensDato, formatDateHour } from '../../utils/dato';
import { hentTekst } from '../../utils/søknad';
import KomponentGruppe from '../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { useSkjema } from '../SkjemaContext';
import Feilside from '../../components/feil/Feilside';
import Lenke from 'nav-frontend-lenker';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import styled from 'styled-components/macro';

const StyledBeskrivelse = styled.div`
  .typo-normal {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { skjema } = useSkjema();

  const mottattAlert: string =
    hentTekst('skjema.alert.mottatt', intl) +
    ` ${formatDateHour(
      skjema?.innsendingsdato ? skjema.innsendingsdato : dagensDato
    )} `;

  return skjema?.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'skjema.takk' })}
      skalViseKnapper={false}
    >
      <KomponentGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </KomponentGruppe>
      <KomponentGruppe>
        <StyledBeskrivelse>
          <Normaltekst>
            <LocaleTekst tekst={'skjema.beskrivelse'} />
          </Normaltekst>
        </StyledBeskrivelse>
      </KomponentGruppe>

      <KomponentGruppe>
        <FeltGruppe>
          <StyledBeskrivelse>
            <Normaltekst>
              <LocaleTekst tekst={'arbeidssøker.tekst.tillegstønad'} />
            </Normaltekst>
          </StyledBeskrivelse>
        </FeltGruppe>
        <FeltGruppe>
          <Lenke
            href={
              'https://www.nav.no/no/person/familie/enslig-mor-eller-far/tilleggsstonader-og-stonad-til-skolepenger'
            }
          >
            <Normaltekst>
              <LocaleTekst tekst={'arbeidssøker.lenke.tilleggstønad'} />
            </Normaltekst>
          </Lenke>
        </FeltGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={'https://arbeidssokerregistrering.nav.no/'}
        >
          <LocaleTekst tekst={'arbeidssøker.knapp.tilleggstønad'} />
        </a>
      </KomponentGruppe>
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
