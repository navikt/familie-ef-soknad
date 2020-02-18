import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import classNames from 'classnames';
import TilbakeKnapp from '../knapper/TilbakeKnapp';
import Banner from '../Banner';
import { Panel } from 'nav-frontend-paneler';
import { useLocation, useHistory } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Routes } from '../../routing/Routes';
import { hentForrigeRoute, hentNesteRoute } from '../../routing/utils';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import { IRoute } from 'express';

interface ISide {
  tittel: string;
}

const Side: React.FC<ISide> = ({ tittel, children }) => {
  const location = useLocation();
  const history = useHistory();

  const routes = Object.values(Routes);
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
  const nesteRoute = hentNesteRoute(Routes, location.pathname);
  const forrigeRoute = hentForrigeRoute(Routes, location.pathname);
  const knappStyling = classNames({
    hideButton: nesteRoute === undefined,
  });
  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={'banner.tittel'} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        <TilbakeKnapp path={forrigeRoute.path} />
        <Panel className={'side__innhold'}>
          <main className={'innholdscontainer'}>
            <Systemtittel>{tittel}</Systemtittel>
            {children}
          </main>
        </Panel>
        <div className={'side__knapper'}>
          <>
            <KnappBase
              type={'hoved'}
              onClick={() => history.push(nesteRoute.path)}
              className={knappStyling}
            >
              <LocaleTekst tekst={'knapp.neste'} />
            </KnappBase>
            <KnappBase
              type={'flat'}
              onClick={() => history.push(Routes[0].path)}
            >
              <LocaleTekst tekst={'knapp.avbryt'} />
            </KnappBase>
          </>
        </div>
      </div>
    </div>
  );
};

export default Side;
