import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnepass from './OppsummeringBarnepass';
import OppsummeringBosituasionenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from '../../routing/routesBarnetilsyn';
import { IBarn } from '../../../models/steg/barn';
import { Normaltekst } from 'nav-frontend-typografi';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { useIntl } from 'react-intl';
import { hentPath } from '../../../utils/routing';
import Side, { ESide } from '../../../components/side/Side';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreBarnetilsyn, søknad } = useBarnetilsynSøknad();
  const barnSomSkalHaBarnepass: IBarn[] = søknad.person.barn.filter(
    (barn) => barn.skalHaBarnepass?.verdi
  );
  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        erSpørsmålBesvart={true}
        mellomlagreStønad={mellomlagreBarnetilsyn}
        routesStønad={RoutesBarnetilsyn}
        skalViseKnapper={ESide.visTilbakeNesteAvbrytKnapp}
      >
        <div className={'oppsummering'}>
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.OmDeg
              )}
            />
            <OppsummeringBosituasionenDin
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BarnaDine
              )}
            />
            <OppsummeringBarnasBosituasjon
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BostedOgSamvær
              )}
            />
            <OppsummeringAktiviteter
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.Aktivitet
              )}
            />
            <OppsummeringBarnepass
              søkerFraBestemtDato={søknad.søkerFraBestemtMåned}
              søknadsdato={søknad.søknadsdato}
              barnSomSkalHaBarnepass={barnSomSkalHaBarnepass}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.Barnepass
              )}
            />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
