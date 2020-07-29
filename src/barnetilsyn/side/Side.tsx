import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import classNames from 'classnames';
import Banner from '../../components/Banner';
import { Panel } from 'nav-frontend-paneler';
import { useLocation, useHistory } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import { Routes } from '../routing/Routes';
import { hentForrigeRoute, hentNesteRoute } from '../routing/Routes';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import StyledNavigeringsWrapper from '../../components/knapper/StyledNavigeringsWrapper';
import SendBrevSVG from '../../assets/SendSøknadSVG';

interface ISide {
  tittel: string;
  erSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
  mellomlagreBarnetilsyn?: (steg: string) => void;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  erSpørsmålBesvart,
  skalViseKnapper,
  mellomlagreBarnetilsyn,
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
            {erSpørsmålBesvart && (
              <KnappBase
                type={'hoved'}
                onClick={() => {
                  if (mellomlagreBarnetilsyn) {
                    mellomlagreBarnetilsyn(location.pathname);
                  }
                  history.push(nesteRoute.path);
                }}
                className={classNames(
                  'neste',
                  `neste-${nesteRoute.path.replace('/', '')}`,
                  {
                    hideButton: nesteRoute === undefined,
                  }
                )}
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
