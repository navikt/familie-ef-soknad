import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import Feilside from '../../../components/feil/Feilside';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import SykSøker from '../../../søknad/steg/9-kvittering/SykSøker';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import { ErIArbeid } from '../../../models/steg/aktivitet/aktivitet';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';

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
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesBarnetilsyn}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {sykSøker && (
        <SykSøker
          filPath={
            '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_syk_BT.pdf'
          }
        />
      )}

      <DineSaker />
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
