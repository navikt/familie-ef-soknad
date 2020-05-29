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
import StyledNavigeringsWrapper from '../knapper/StyledNavigeringsWrapper';

interface ISide {
  tittel: string;
  erSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  erSpørsmålBesvart,
  skalViseKnapper,
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
        {skalViseKnapper && (
          <StyledNavigeringsWrapper
            classname={
              erSpørsmålBesvart ? 'side__knapper treKnapper' : 'side__knapper '
            }
          >
            <KnappBase
              className={'tilbake'}
              type={'standard'}
              onClick={() => history.push(forrigeRoute.path)}
            >
              <LocaleTekst tekst={'knapp.tilbake'} />
            </KnappBase>
            {(erSpørsmålBesvart || true) && (
              <KnappBase
                type={'hoved'}
                onClick={() => history.push(nesteRoute.path)}
                className={classNames('neste', {
                  hideButton: nesteRoute === undefined,
                })}
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
          </StyledNavigeringsWrapper>
        )}
      </div>
    </div>
  );
};

export default Side;
