import React from 'react';
import Banner from '../../components/Banner';
import classNames from 'classnames';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import Stegindikator from 'nav-frontend-stegindikator';
import { hentForrigeRoute, hentNesteRoute } from '../routes/Routes';
import { Panel } from 'nav-frontend-paneler';
import { Routes } from '../routes/Routes';
import { Systemtittel } from 'nav-frontend-typografi';
import { useLocation, useHistory } from 'react-router-dom';

interface ISide {
  tittel: string;
  erAlleSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  skalViseKnapper,
  erAlleSpørsmålBesvart,
}) => {
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

  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={'banner.tittel.arbeidssøker'} />
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
        {skalViseKnapper && (
          <div
            className={
              erAlleSpørsmålBesvart
                ? 'side__knapper treKnapper'
                : 'side__knapper'
            }
          >
            <KnappBase
              className={'tilbake'}
              type={'standard'}
              onClick={() => history.push(forrigeRoute.path)}
            >
              <LocaleTekst tekst={'knapp.tilbake'} />
            </KnappBase>
            {erAlleSpørsmålBesvart && (
              <KnappBase
                type={'hoved'}
                onClick={() => history.push(nesteRoute.path)}
                className={nesteKnappStyling}
              >
                <LocaleTekst tekst={'knapp.neste'} />
              </KnappBase>
            )}

            <KnappBase
              className={'avbryt'}
              type={'flat'}
              onClick={() => history.push(Routes[0].path)}
            >
              <LocaleTekst tekst={'knapp.avbryt'} />
            </KnappBase>
          </div>
        )}
      </div>
    </div>
  );
};

export default Side;
