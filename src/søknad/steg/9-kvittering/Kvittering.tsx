import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import Feilside from '../../../components/feil/Feilside';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import RegistrerDegSomArbeidssøker from './RegistrerDegSomArbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import TilleggsstønaderArbeidssøker from './TilleggsstønaderArbeidssøker';
import TilleggsstønaderHarAktivitet from './TilleggsstønaderHarAktivitet';
import TilleggsstønaderUnderUtdanning from './TilleggsstønaderUnderUtdanning';
import { dagensDato, formatDateHour } from '../../../utils/dato';
import { ESvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const {
    arbeidssøker,
    underUtdanning,
    arbeidsforhold,
    firma,
    etablererEgenVirksomhet,
  } = søknad.aktivitet;

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  return søknad.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={false}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {arbeidssøker?.registrertSomArbeidssøkerNav?.svarid === ESvar.NEI && (
        <RegistrerDegSomArbeidssøker />
      )}

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
          <LocaleTekst tekst={'kvittering.knapp.dineSaker'} />
        </a>
      </SeksjonGruppe>

      {arbeidssøker && <TilleggsstønaderArbeidssøker />}

      {underUtdanning && <TilleggsstønaderUnderUtdanning />}

      {(arbeidsforhold || firma || etablererEgenVirksomhet) && (
        <TilleggsstønaderHarAktivitet />
      )}
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
