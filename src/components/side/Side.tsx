import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import classNames from 'classnames';
import TilbakeKnapp from '../knapper/TilbakeKnapp';
import Banner from '../Banner';
import { Panel } from 'nav-frontend-paneler';
import { useLocation, useHistory } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Routes } from '../../routing/Routes';
import { hentForrigeRoute } from '../../routing/utils';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';

interface ISide {
  tittel: string;
  tilbakePath: string;
  nestePath: string;
}

const Side: React.FC<ISide> = ({ tittel, nestePath, children }) => {
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
  const forrigePath = hentForrigeRoute(Routes, location.pathname);
  const knappStyling = classNames({
    hideButton: nestePath.length === 0,
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
        <TilbakeKnapp path={forrigePath.path} />
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
              onClick={() => history.push(nestePath)}
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
