import React from 'react';

import styled from 'styled-components/macro';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { hentTekst } from '../../../utils/søknad';
import { dagensDato, formatDateHour } from '../../../utils/dato';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Lenke from 'nav-frontend-lenker';
import Feilside from '../../../components/feil/Feilside';
import Side from '../../../components/side/Side';
import RegistrerDegSomArbeidssøker from './RegistrerDegSomArbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

const StyledBeskrivelse = styled.div`
  .typo-normal {
    li {
      padding-bottom: 0.5rem;
    }
  }
`;

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${formatDateHour(
      søknad?.innsendingsdato ? søknad?.innsendingsdato : dagensDato
    )} `;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={false}
    >
      <KomponentGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </KomponentGruppe>


      <SeksjonGruppe>
        <FeltGruppe>
          <Normaltekst>
            <LocaleTekst tekst={'kvittering.tekst.dineSaker'} />
          </Normaltekst>
        </FeltGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
        >
          <LocaleTekst tekst={'kvittering.knapp.arbeidssøker'} />
        </a>
      </SeksjonGruppe>

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
          href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
        >
          <LocaleTekst tekst={'arbeidssøker.knapp.tilleggstønad'} />
        </a>
      </KomponentGruppe>
    </Side>
  );
};

export default Kvittering;
