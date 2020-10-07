import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringDinSituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringDinSituasjon';
import OppsummeringBosituasjonenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import { useSøknad } from '../../../context/SøknadContext';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from '../../routing/routesOvergangsstonad';
import { hentPath } from '../../../utils/routing';
import Side, { ESide } from '../../../components/side/Side';
import { hentTekst } from '../../../utils/søknad';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logEvent } from '../../../utils/amplitude';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad, søknad } = useSøknad();

  useEffect(() => {
    logEvent('sidevisning', { side: 'Oppsummering' });
  }, []);

  return (
    <>
      <Side
        stønadstype={Stønadstype.overgangsstønad}
        stegtittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={ESide.visTilbakeNesteAvbrytKnapp}
        erSpørsmålBesvart={true}
        mellomlagreStønad={mellomlagreOvergangsstønad}
        routesStønad={RoutesOvergangsstonad}
      >
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.OmDeg
              )}
            />
            <OppsummeringBosituasjonenDin
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              barn={søknad.person.barn}
              stønadstype={Stønadstype.overgangsstønad}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.Barn
              )}
            />
            <OppsummeringBarnasBosituasjon
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.BarnasBosted
              )}
            />
            <OppsummeringAktiviteter
              tittel={hentTekst('stegtittel.arbeidssituasjon', intl)}
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.Aktivitet
              )}
            />
            <OppsummeringDinSituasjon
              dinSituasjon={søknad.merOmDinSituasjon}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.DinSituasjon
              )}
            />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
