import React from 'react';
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
import {
  logSidevisningOvergangsstonad,
  logBrowserBackOppsummering,
} from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { IBarn } from '../../../models/steg/barn';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';

interface Props {
  history: RouteComponentProps['history'];
}

const Oppsummering: React.FC<Props> = ({ history }) => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad, søknad } = useSøknad();
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Overgangsstønad];

  useMount(() => logSidevisningOvergangsstonad('Oppsummering'));

  const barnMedsærligeTilsynsbehov = søknad.person.barn
    .filter((barn: IBarn) => barn.særligeTilsynsbehov)
    .map((barn: IBarn) => barn.særligeTilsynsbehov);

  useEffect(() => {
    const { action } = history;

    if (action === 'POP') {
      logBrowserBackOppsummering(ESkjemanavn.Overgangsstønad, skjemaId);
    }
    // eslint-disable-next-line
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
              tittel={hentTekst('stegtittel.omDeg', intl)}
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.OmDeg
              )}
            />
            <OppsummeringBosituasjonenDin
              tittel={hentTekst('stegtittel.bosituasjon', intl)}
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              tittel={hentTekst('barnadine.sidetittel', intl)}
              barn={søknad.person.barn}
              stønadstype={Stønadstype.overgangsstønad}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.Barn
              )}
            />
            <OppsummeringBarnasBosituasjon
              tittel={hentTekst('barnasbosted.sidetittel', intl)}
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
              tittel={hentTekst('stegtittel.dinSituasjon', intl)}
              dinSituasjon={søknad.merOmDinSituasjon}
              barnMedsærligeTilsynsbehov={barnMedsærligeTilsynsbehov}
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
