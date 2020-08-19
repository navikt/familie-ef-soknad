import React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import Feilside from '../../../components/feil/Feilside';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import TilleggsstønaderUnderUtdanning from '../../../søknad/steg/9-kvittering/TilleggsstønaderUnderUtdanning';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import ErklæringSamlivsbrudd from '../../../søknad/steg/9-kvittering/ErklæringSamlivsbrudd';
import { EBegrunnelse } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesSkolepenger } from '../../routing/routes';
import RegistrerBarnIFolkeregister from '../../../søknad/steg/9-kvittering/RegistrerBarnIFolkeregister';
import EttersendDokumentasjon from '../../../søknad/steg/9-kvittering/EttersendDokumentasjon';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { useSkolepengerSøknad } from '../../SkolepengerContext';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSkolepengerSøknad();

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const erklæringSamlivsbrudd =
    søknad.sivilstatus.årsakEnslig?.svarid ===
    EBegrunnelse.samlivsbruddForeldre;

  return søknad.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesSkolepenger}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>
      <DineSaker />
      {erklæringSamlivsbrudd && <ErklæringSamlivsbrudd />}
      {søknad.utdanning && (
        <TilleggsstønaderUnderUtdanning stønadstype={Stønadstype.skolepenger} />
      )}
      <RegistrerBarnIFolkeregister barna={søknad.person.barn} />
      <EttersendDokumentasjon
        dokumentasjonsbehov={søknad.dokumentasjonsbehov}
        stønadstype={Stønadstype.overgangsstønad}
      />
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
