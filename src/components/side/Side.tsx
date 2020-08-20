import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import Banner from '../../components/Banner';
import { Panel } from 'nav-frontend-paneler';
import { useHistory, useLocation } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import SendBrevSVG from '../../assets/SendSøknadSVG';
import { hentTekst } from '../../utils/søknad';
import { useIntl } from 'react-intl';
import TilbakeNesteAvbrytKnapper from '../../components/knapper/TilbakeNesteAvbrytKnapper';
import { IRoute } from '../../models/routes';

export enum ESide {
  visTilbakeNesteAvbrytKnapp = 'visTilbakeNesteAvbrytKnapp',
  visTilbakeTilOppsummeringKnapp = 'visTilbakeTilOppsummeringKnapp',
  skjulKnapper = 'skjulKnapper',
}

interface ISide {
  tittel: string;
  routesStønad: IRoute[];
  skalViseKnapper: ESide;
  erSpørsmålBesvart?: boolean;
  mellomlagreStønad?: (steg: string) => void;
  tilbakeTilOppsummeringPath?: string;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  routesStønad,
  erSpørsmålBesvart,
  skalViseKnapper,
  mellomlagreStønad,
  tilbakeTilOppsummeringPath,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();

  const routes = Object.values(routesStønad);
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
        {skalViseKnapper === ESide.visTilbakeNesteAvbrytKnapp ? (
          <TilbakeNesteAvbrytKnapper
            routesStønad={routesStønad}
            erSpørsmålBesvart={erSpørsmålBesvart}
            mellomlagreStønad={mellomlagreStønad}
          />
        ) : skalViseKnapper === ESide.visTilbakeTilOppsummeringKnapp ? (
          erSpørsmålBesvart && (
            <Hovedknapp
              className="tilbake-til-oppsummering"
              onClick={() => {
                if (mellomlagreStønad) {
                  mellomlagreStønad(location.pathname);
                }
                history.push({
                  pathname: tilbakeTilOppsummeringPath,
                });
              }}
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
