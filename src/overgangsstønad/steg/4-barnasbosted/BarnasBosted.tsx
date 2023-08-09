import React, { useEffect, useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarn } from '../../../models/steg/barn';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { antallBarnMedForeldreUtfylt } from '../../../utils/barn';
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import BarnasBostedInnhold from '../../../søknad/steg/4-barnasbosted/BarnasBostedInnhold';

const BarnasBosted: React.FC = () => {
  const intl = useLokalIntlContext();
  const location = useLocation();
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settDokumentasjonsbehovForBarn,
    oppdaterBarnISoknaden,
  } = useSøknad();

  const aktuelleBarn = søknad.person.barn.filter((barn: IBarn) => {
    return !barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false;
  });

  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(aktuelleBarn);

  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(
    antallBarnMedForeldre === aktuelleBarn.length
  );

  useMount(() => logSidevisningOvergangsstonad('BarnasBosted'));

  useEffect(() => {
    settSisteBarnUtfylt(
      antallBarnMedForeldreUtfylt(aktuelleBarn) === aktuelleBarn.length
    );
  }, [søknad]);

  return (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesOvergangsstonad}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
    >
      <BarnasBostedInnhold
        aktuelleBarn={aktuelleBarn}
        barneliste={søknad.person.barn}
        oppdaterBarnISoknaden={oppdaterBarnISoknaden}
        settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
        sisteBarnUtfylt={sisteBarnUtfylt}
        settSisteBarnUtfylt={settSisteBarnUtfylt}
      />
    </Side>
  );
};

export default BarnasBosted;
