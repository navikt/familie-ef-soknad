import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import { IBarn } from '../../../models/steg/barn';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { antallBarnMedForeldreUtfylt } from '../../../utils/barn';
import { ISøknad } from '../../models/søknad';
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import BarnasBostedInnhold from '../../../søknad/steg/4-barnasbosted/BarnasBostedInnhold';

const BarnasBosted: React.FC = () => {
  const intl = useLokalIntlContext();
  const location = useLocation();
  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreSkolepenger,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useSkolepengerSøknad();

  useMount(() => logSidevisningSkolepenger('BarnasBosted'));

  const aktuelleBarn = søknad.person.barn.filter((barn: IBarn) => {
    return !barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false;
  });

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(aktuelleBarn);
  const [sisteBarnUtfylt] = useState<boolean>(
    antallBarnMedForeldre === aktuelleBarn.length
  );

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  return (
    <Side
      stønadstype={Stønadstype.skolepenger}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesSkolepenger}
      mellomlagreStønad={mellomlagreSkolepenger}
      tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
    >
      <BarnasBostedInnhold
        barn={aktuelleBarn}
        barneliste={søknad.person.barn}
        settBarneliste={settBarneliste}
        settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
      />
    </Side>
  );
};

export default BarnasBosted;
