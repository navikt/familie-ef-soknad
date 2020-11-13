import React, { useEffect } from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import Feilside from '../../../components/feil/Feilside';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import TilleggsstønaderUnderUtdanning from '../../../søknad/steg/9-kvittering/TilleggsstønaderUnderUtdanning';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst, oppdaterBarnMedLabel } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import ErklæringSamlivsbrudd from '../../../søknad/steg/9-kvittering/ErklæringSamlivsbrudd';
import { EBegrunnelse } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesSkolepenger } from '../../routing/routes';
import RegistrerBarnIFolkeregister from '../../../søknad/steg/9-kvittering/RegistrerBarnIFolkeregister';
import EttersendDokumentasjon from '../../../søknad/steg/9-kvittering/EttersendDokumentasjon';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import { usePersonContext } from '../../../context/PersonContext';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    nullstillMellomlagretSkolepenger,
    nullstillSøknadSkolepenger,
  } = useSkolepengerSøknad();
  const { person } = usePersonContext();

  useMount(() => logSidevisningSkolepenger('Kvittering'));

  useEffect(() => {
    nullstillMellomlagretSkolepenger();
    return () => {
      const barnelisteMedLabels = oppdaterBarnMedLabel(person.barn);
      nullstillSøknadSkolepenger(person, barnelisteMedLabels);
    };
  }, [nullstillMellomlagretSkolepenger, nullstillSøknadSkolepenger, person]);

  const mottattAlert: string =
    hentTekst('kvittering.skolepenger.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const erklæringSamlivsbrudd =
    søknad.sivilstatus.årsakEnslig?.svarid ===
    EBegrunnelse.samlivsbruddForeldre;

  return søknad.innsendingsdato ? (
    <Side
      stønadstype={Stønadstype.skolepenger}
      stegtittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesSkolepenger}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>
      <DineSaker />
      <EttersendDokumentasjon
        dokumentasjonsbehov={søknad.dokumentasjonsbehov}
        stønadstype={Stønadstype.overgangsstønad}
      />
      {erklæringSamlivsbrudd && <ErklæringSamlivsbrudd />}
      <RegistrerBarnIFolkeregister barna={søknad.person.barn} />
      {søknad.utdanning && (
        <TilleggsstønaderUnderUtdanning stønadstype={Stønadstype.skolepenger} />
      )}
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
