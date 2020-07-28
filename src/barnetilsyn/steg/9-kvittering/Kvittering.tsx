import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import Feilside from '../../../components/feil/Feilside';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import SykSøker from '../../../søknad/steg/9-kvittering/SykSøker';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import TilleggsstønaderHarAktivitet from '../../../søknad/steg/9-kvittering/TilleggsstønaderHarAktivitet';
import { ErIArbeid } from '../../../models/steg/aktivitet/aktivitet';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useBarnetilsynSøknad();
  const {
    arbeidsforhold,
    firma,
    egetAS,
    etablererEgenVirksomhet,
  } = søknad.aktivitet;

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const sykSøker =
    søknad.aktivitet?.erIArbeid?.svarid === ErIArbeid.NeiFordiJegErSyk;

  return søknad.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={false}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {sykSøker && <SykSøker />}

      <DineSaker />

      {(arbeidsforhold || firma || etablererEgenVirksomhet || egetAS) && (
        <TilleggsstønaderHarAktivitet />
      )}
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
