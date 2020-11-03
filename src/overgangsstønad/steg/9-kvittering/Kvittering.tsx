import React, { useEffect } from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import DineSaker from '../../../søknad/steg/9-kvittering/DineSaker';
import Feilside from '../../../components/feil/Feilside';
import RegistrerDegSomArbeidssøker from '../../../søknad/steg/9-kvittering/RegistrerDegSomArbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import TilleggsstønaderArbeidssøker from '../../../søknad/steg/9-kvittering/TilleggsstønaderArbeidssøker';
import TilleggsstønaderHarAktivitet from '../../../søknad/steg/9-kvittering/TilleggsstønaderHarAktivitet';
import TilleggsstønaderUnderUtdanning from '../../../søknad/steg/9-kvittering/TilleggsstønaderUnderUtdanning';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import { formatDateHour } from '../../../utils/dato';
import { hentTekst, oppdaterBarnMedLabel } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import SyktBarn from '../../../søknad/steg/9-kvittering/SyktBarn';
import { useSøknad } from '../../../context/SøknadContext';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import SykSøker from '../../../søknad/steg/9-kvittering/SykSøker';
import ErklæringSamlivsbrudd from '../../../søknad/steg/9-kvittering/ErklæringSamlivsbrudd';
import { EBegrunnelse } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import RegistrerBarnIFolkeregister from '../../../søknad/steg/9-kvittering/RegistrerBarnIFolkeregister';
import EttersendDokumentasjon from '../../../søknad/steg/9-kvittering/EttersendDokumentasjon';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { usePersonContext } from '../../../context/PersonContext';
import { logEvent } from '../../../utils/amplitude';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    nullstillMellomlagretOvergangsstønad,
    nullstillSøknadOvergangsstønad,
  } = useSøknad();

  useEffect(() => {
    logEvent('sidevisning', { side: 'Kvittering' });
  }, []);

  const { person } = usePersonContext();
  const {
    arbeidssøker,
    underUtdanning,
    arbeidsforhold,
    firmaer,
    egetAS,
    etablererEgenVirksomhet,
  } = søknad.aktivitet;

  useEffect(() => {
    nullstillMellomlagretOvergangsstønad();
    return () => {
      const barnelisteMedLabels = oppdaterBarnMedLabel(person.barn);
      nullstillSøknadOvergangsstønad(person, barnelisteMedLabels);
    };
  }, [
    nullstillMellomlagretOvergangsstønad,
    nullstillSøknadOvergangsstønad,
    person,
  ]);

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${søknad?.innsendingsdato && formatDateHour(søknad?.innsendingsdato)} `;

  const syktBarn = søknad.merOmDinSituasjon?.gjelderDetteDeg.svarid.includes(
    DinSituasjonType.harSyktBarn
  );

  const sykSøker = søknad.merOmDinSituasjon?.gjelderDetteDeg.svarid.includes(
    DinSituasjonType.erSyk
  );

  const erklæringSamlivsbrudd =
    søknad.sivilstatus.årsakEnslig?.svarid ===
    EBegrunnelse.samlivsbruddForeldre;

  return søknad.innsendingsdato ? (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesOvergangsstonad}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>
      <DineSaker />
      <EttersendDokumentasjon
        dokumentasjonsbehov={søknad.dokumentasjonsbehov}
        stønadstype={Stønadstype.overgangsstønad}
      />
      {arbeidssøker?.registrertSomArbeidssøkerNav?.svarid === ESvar.NEI && (
        <RegistrerDegSomArbeidssøker />
      )}

      {syktBarn && <SyktBarn />}
      {sykSøker && (
        <SykSøker
          filPath={
            '/familie/alene-med-barn/soknad/filer/Checklist_for_your_doctors_appointment_OS_EN.pdf'
          }
        />
      )}

      {erklæringSamlivsbrudd && <ErklæringSamlivsbrudd />}
      <RegistrerBarnIFolkeregister barna={søknad.person.barn} />

      {arbeidssøker && <TilleggsstønaderArbeidssøker />}

      {underUtdanning && (
        <TilleggsstønaderUnderUtdanning
          stønadstype={Stønadstype.overgangsstønad}
        />
      )}
      {(arbeidsforhold || firmaer || etablererEgenVirksomhet || egetAS) && (
        <TilleggsstønaderHarAktivitet />
      )}
    </Side>
  ) : (
    <Feilside />
  );
};

export default Kvittering;
