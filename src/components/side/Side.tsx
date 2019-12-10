import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import TilbakeKnapp from '../TilbakeKnapp';
import Banner from '../Banner';
import { Panel } from 'nav-frontend-paneler';
import NavKnapp, { knapptype } from '../NavKnapp';
import { useLocation } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Routes } from '../../config/Routes';
import { hentForrigeRoute } from '../../utils/routing';

interface ISide {
  tittel: string;
  tilbakePath?: string;
  nestePath?: string;
}

const Side: React.FC<ISide> = ({ tittel, nestePath, children }) => {
  const location = useLocation();

  let stegobjekter = [];
  const routes = Routes;
  const aktivtSteg = routes.findIndex(
    (steg) => steg.path === location.pathname
  );

  for (let i = 0; i < routes.length; i++) {
    const steg = Object.assign({
      index: i + 1,
      label: routes[i].label,
      path: routes[i].path,
    });
    i !== 0 && stegobjekter.push(steg);
  }

  const forrigePath = hentForrigeRoute(routes, location.pathname);
  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={'banner.tittel'} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        <TilbakeKnapp path={forrigePath.path} />
        <Panel className={'side__innhold'}>
          <main className={'innholdscontainer'}>
            <Systemtittel>{tittel}</Systemtittel>
            {children}
          </main>
        </Panel>
        <div className={'side__knapper'}>
          {nestePath ? (
            <>
              <NavKnapp
                tekstid={'Neste'}
                type={knapptype.Hoved}
                nyPath={nestePath}
              />
              <NavKnapp
                tekstid={'Avbryt'}
                type={knapptype.Flat}
                nyPath={Routes[0].path}
              />
            </>
          ) : (
            <NavKnapp
              tekstid={'Avbryt'}
              type={knapptype.Flat}
              nyPath={Routes[0].path}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Side;
