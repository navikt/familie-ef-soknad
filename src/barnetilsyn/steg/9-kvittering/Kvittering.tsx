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
import ErklæringSamlivsbrudd from '../../../søknad/steg/9-kvittering/ErklæringSamlivsbrudd';
import { EBegrunnelse } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import RegistrerBarnIFolkeregister from '../../../søknad/steg/9-kvittering/RegistrerBarnIFolkeregister';
import EttersendDokumentasjon from '../../../søknad/steg/9-kvittering/EttersendDokumentasjon';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useBarnetilsynSøknad();
  const barnSomSkalHaBarnepass = søknad.person.barn.filter(
    (barn) => barn.skalHaBarnepass?.verdi
  );

  const mottattAlert: string =
    hentTekst('kvittering.barnetilsyn.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const sykSøker =
    søknad.aktivitet?.erIArbeid?.svarid === ErIArbeid.NeiFordiJegErSyk;
  const erklæringSamlivsbrudd =
    søknad.sivilstatus.årsakEnslig?.svarid ===
    EBegrunnelse.samlivsbruddForeldre;

  return søknad.innsendingsdato ? (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesBarnetilsyn}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      <DineSaker />
      {sykSøker && (
        <SykSøker
          filPath={
            '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_syk_BT.pdf'
          }
        />
      )}
      {erklæringSamlivsbrudd && <ErklæringSamlivsbrudd />}

      <RegistrerBarnIFolkeregister barna={barnSomSkalHaBarnepass} />
      <EttersendDokumentasjon
        dokumentasjonsbehov={søknad.dokumentasjonsbehov}
        stønadstype={Stønadstype.barnetilsyn}
      />
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
