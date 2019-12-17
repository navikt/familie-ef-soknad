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

  const aktivtSteg = Routes.findIndex(
    (steg) => steg.path === location.pathname
  );
  const routes = Object.values(Routes);
  routes.shift();
  const stegobjekter = routes.map((steg, index) => {
    return {
      ...steg,
      index: index,
    };
  });

  const forrigePath = hentForrigeRoute(Routes, location.pathname);
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
