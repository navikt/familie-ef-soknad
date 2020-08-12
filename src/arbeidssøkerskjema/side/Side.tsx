import React from 'react';
import Banner from '../../components/Banner';
import classNames from 'classnames';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import Stegindikator from 'nav-frontend-stegindikator';

import { Panel } from 'nav-frontend-paneler';
import { RoutesArbeidssokerskjema } from '../routes/routesArbeidssokerskjema';
import { Systemtittel } from 'nav-frontend-typografi';
import { useLocation, useHistory } from 'react-router-dom';
import { hentForrigeRoute, hentNesteRoute } from '../../utils/routing';

interface ISide {
  tittel: string;
  erSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  skalViseKnapper,
  erSpørsmålBesvart,
}) => {
  const location = useLocation();
  const history = useHistory();

  const routes = Object.values(RoutesArbeidssokerskjema);
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
  const nesteRoute = hentNesteRoute(
    RoutesArbeidssokerskjema,
    location.pathname
  );
  const forrigeRoute = hentForrigeRoute(
    RoutesArbeidssokerskjema,
    location.pathname
  );
  const nesteKnappStyling = classNames('neste', {
    hideButton: nesteRoute === undefined,
  });

  return (
    <div className={'skjema'}>
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
              erSpørsmålBesvart ? 'side__knapper treKnapper' : 'side__knapper'
            }
          >
            <KnappBase
              className={'tilbake'}
              type={'standard'}
              onClick={() => history.push(forrigeRoute.path)}
            >
              <LocaleTekst tekst={'knapp.tilbake'} />
            </KnappBase>
            {erSpørsmålBesvart && (
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
              onClick={() => history.push(RoutesArbeidssokerskjema[0].path)}
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
