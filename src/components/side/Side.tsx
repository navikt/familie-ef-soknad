import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import classNames from 'classnames';
import Banner from '../Banner';
import { Panel } from 'nav-frontend-paneler';
import { useLocation, useHistory } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Routes } from '../../routing/Routes';
import { hentForrigeRoute, hentNesteRoute } from '../../routing/utils';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';

interface ISide {
  tittel: string;
  kommerFraOppsummering?: boolean;
}

const Side: React.FC<ISide> = ({ tittel, children, kommerFraOppsummering }) => {
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
  const nesteKnappStyling = classNames('neste', {
    hideButton: nesteRoute === undefined,
  });

  console.log('nesteRoute', nesteRoute);
  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={'banner.tittel'} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        <Panel className={'side__innhold'}>
          <main className={'innholdscontainer'}>
            <Systemtittel>{tittel}</Systemtittel>
            {children}
          </main>
        </Panel>
        {!kommerFraOppsummering ? (
          <div className={'side__knapper'}>
            <KnappBase
              className={'tilbake'}
              type={'standard'}
              onClick={() => history.push(forrigeRoute.path)}
            >
              <LocaleTekst tekst={'knapp.tilbake'} />
            </KnappBase>
            <KnappBase
              type={'hoved'}
              onClick={() => history.push(nesteRoute.path)}
              className={nesteKnappStyling}
            >
              <LocaleTekst tekst={'knapp.neste'} />
            </KnappBase>
            <KnappBase
              className={'avbryt'}
              type={'flat'}
              onClick={() => history.push(Routes[0].path)}
            >
              <LocaleTekst tekst={'knapp.avbryt'} />
            </KnappBase>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Side;
