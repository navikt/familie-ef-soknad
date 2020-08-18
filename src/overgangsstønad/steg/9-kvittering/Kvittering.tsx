import React from 'react';

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
import { hentTekst } from '../../../utils/søknad';
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

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const {
    arbeidssøker,
    underUtdanning,
    arbeidsforhold,
    firmaer,
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

  const erklæringSamlivsbrudd =
    søknad.sivilstatus.årsakEnslig?.svarid ===
    EBegrunnelse.samlivsbruddForeldre;

  return søknad.innsendingsdato ? (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={ESide.skjulKnapper}
      routesStønad={RoutesOvergangsstonad}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {sykSøker && (
        <SykSøker
          filPath={
            '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_syk_OS.pdf'
          }
        />
      )}

      {syktBarn && <SyktBarn />}
      {erklæringSamlivsbrudd && <ErklæringSamlivsbrudd />}
      {arbeidssøker?.registrertSomArbeidssøkerNav?.svarid === ESvar.NEI && (
        <RegistrerDegSomArbeidssøker />
      )}

      <DineSaker />

      {arbeidssøker && <TilleggsstønaderArbeidssøker />}

      {underUtdanning && <TilleggsstønaderUnderUtdanning />}
      <RegistrerBarnIFolkeregister barna={søknad.person.barn} />
      {(arbeidsforhold || firmaer || etablererEgenVirksomhet || egetAS) && (
        <TilleggsstønaderHarAktivitet />
      )}
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
