import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import Banner from '../../components/Banner';
import { Panel } from 'nav-frontend-paneler';
import { useLocation, useHistory } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from '../routing/routesBarnetilsyn';
import { Hovedknapp } from 'nav-frontend-knapper';

import SendBrevSVG from '../../assets/SendSøknadSVG';
import {
  hentForrigeRoute,
  hentNesteRoute,
  hentPath,
} from '../../utils/routing';
import { hentTekst } from '../../utils/søknad';
import { useIntl } from 'react-intl';
import TilbakeNesteAvbrytKnapper from '../../components/knapper/TilbakeNesteAvbrytKnapper';

interface ISide {
  tittel: string;
  erSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
  mellomlagreBarnetilsyn?: (steg: string) => void;
  kommerFraOppsummering?: boolean;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  erSpørsmålBesvart,
  skalViseKnapper,
  mellomlagreBarnetilsyn,
  kommerFraOppsummering,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();

  const routes = Object.values(RoutesBarnetilsyn);
  routes.shift();
  const stegobjekter = routes.map((steg, index) => {
    return {
      ...steg,
      index: index,
    };
  });
  const aktivtSteg = stegobjekter.findIndex(
    (steg) => steg.path === location.pathname
  );
  const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
  const forrigeRoute = hentForrigeRoute(RoutesBarnetilsyn, location.pathname);

  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={'barnetilsyn.sidetittel'} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        {!skalViseKnapper && (
          <div className={'brev_ikon'}>
            <SendBrevSVG />
          </div>
        )}

        <Panel className={'side__innhold'}>
          <main className={'innholdscontainer'}>
            <Systemtittel>{tittel}</Systemtittel>
            {children}
          </main>
        </Panel>

        {skalViseKnapper ? (
          !kommerFraOppsummering ? (
            <TilbakeNesteAvbrytKnapper
              routesStønad={RoutesBarnetilsyn}
              erSpørsmålBesvart={erSpørsmålBesvart}
            />
          ) : (
            <Hovedknapp
              className="tilbake-til-oppsummering"
              onClick={() =>
                history.push({
                  pathname: hentPath(
                    RoutesBarnetilsyn,
                    ERouteBarnetilsyn.Oppsummering
                  ),
                })
              }
            >
              {hentTekst('oppsummering.tilbake', intl)}
            </Hovedknapp>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Side;
