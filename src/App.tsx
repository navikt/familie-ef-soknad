import React, { useEffect, useState } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Søknad from './komponenter/Søknad';

import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';
import autentiser from './authentication/authenticateApi';
import { ToggleName, Toggles } from './typer/toggles';

const useToggles = process.env.REACT_APP_BRUK_TOGGLES === 'true';
const useAuthentication = process.env.REACT_APP_BRUK_AUTENTISERING === 'true';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(
    !useAuthentication
  );
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  const checkToggle = (toggles: Toggles, toggleName: string) => {
    if (useToggles) {
      return toggles[toggleName];
    }
    return true;
  };

  useEffect(() => {
    const fetchData = () => {
      if (useAuthentication) {
        autentiser(settAutentisering);
      }
      if (useToggles) {
        hentToggles(settToggles);
      }
      settFetching(false);
    };
    settError(false);
    fetchData();
  }, []);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>
              {checkToggle(toggles, ToggleName.vis_innsending) ? (
                <Søknad />
              ) : (
                <></>
              )}
            </div>
          </Panel>
        </div>
      );
    } else if (error) {
      return <Feilside />;
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
