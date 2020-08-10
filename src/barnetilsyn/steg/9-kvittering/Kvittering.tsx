import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import Feilside from '../../../components/feil/Feilside';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../overgangsstønad/side/Side';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import SykSøker from '../../../søknad/steg/9-kvittering/SykSøker';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import { ErIArbeid } from '../../../models/steg/aktivitet/aktivitet';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useBarnetilsynSøknad();

  const mottattAlert: string =
    hentTekst('kvittering.barnetilsyn.alert.mottatt', intl) +
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
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
