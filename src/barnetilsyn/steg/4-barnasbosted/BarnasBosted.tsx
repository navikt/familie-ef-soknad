import React, { useEffect, useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { IBarn } from '../../../models/steg/barn';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { antallBarnMedForeldreUtfylt } from '../../../utils/barn';
import { ISøknad } from '../../models/søknad';
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import BarnasBostedInnhold from '../../../søknad/steg/4-barnasbosted/BarnasBostedInnhold';

const BarnasBosted: React.FC = () => {
  const intl = useLokalIntlContext();
  const location = useLocation();
  const {
    søknad,
    mellomlagreBarnetilsyn,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useBarnetilsynSøknad();

  useMount(() => logSidevisningBarnetilsyn('BarnasBosted'));

  // TODO: Ikke fjern barna som ikke er valgt!!! Kun oppdater det barnet som skal oppdateres :D
  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const aktuelleBarn = søknad.person.barn.filter(
    (barn: IBarn) => barn.skalHaBarnepass?.verdi
  );

  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(aktuelleBarn);
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(
    antallBarnMedForeldre === aktuelleBarn.length
  );

  useEffect(() => {
    settSisteBarnUtfylt(
      antallBarnMedForeldreUtfylt(aktuelleBarn) === aktuelleBarn.length
    );
  }, [søknad]);

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      <BarnasBostedInnhold
        barn={aktuelleBarn}
        barneliste={søknad.person.barn}
        settBarneliste={settBarneliste}
        settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
        sisteBarnUtfylt={sisteBarnUtfylt}
        settSisteBarnUtfylt={settSisteBarnUtfylt}
      />
    </Side>
  );
};

export default BarnasBosted;
