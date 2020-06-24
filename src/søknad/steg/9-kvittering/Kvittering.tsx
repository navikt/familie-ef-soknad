import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import DineSaker from './DineSaker';
import Feilside from '../../../components/feil/Feilside';
import RegistrerDegSomArbeidssøker from './RegistrerDegSomArbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import TilleggsstønaderArbeidssøker from './TilleggsstønaderArbeidssøker';
import TilleggsstønaderHarAktivitet from './TilleggsstønaderHarAktivitet';
import TilleggsstønaderUnderUtdanning from './TilleggsstønaderUnderUtdanning';
import { ESvar } from '../../../models/spørsmålogsvar';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import SyktBarn from './SyktBarn';
import { useSøknad } from '../../../context/SøknadContext';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import SykSøker from './SykSøker';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const {
    arbeidssøker,
    underUtdanning,
    arbeidsforhold,
    firma,
    egetAS,
    etablererEgenVirksomhet,
  } = søknad.aktivitet;

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const syktBarn = søknad.merOmDinSituasjon?.gjelderDetteDeg.svarid.includes(
    DinSituasjonType.harSyktBarn
  );

  const sykSøker = søknad.merOmDinSituasjon?.gjelderDetteDeg.svarid.includes(
    DinSituasjonType.erSyk
  );

  return søknad.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={false}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {sykSøker && <SykSøker />}

      {syktBarn && <SyktBarn />}

      {arbeidssøker?.registrertSomArbeidssøkerNav?.svarid === ESvar.NEI && (
        <RegistrerDegSomArbeidssøker />
      )}

      <DineSaker />

      {arbeidssøker && <TilleggsstønaderArbeidssøker />}

      {underUtdanning && <TilleggsstønaderUnderUtdanning />}

      {(arbeidsforhold || firma || etablererEgenVirksomhet || egetAS) && (
        <TilleggsstønaderHarAktivitet />
      )}
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
