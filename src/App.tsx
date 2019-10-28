import React, { useEffect, useState, useContext } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Spørsmål from './komponenter/Spørsmal';
import Søknad from './komponenter/Søknad';
import { client } from './utils/sanity';

import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';
import autentiser from './authentication/authenticateApi';
import { ToggleName, Toggles } from './typer/toggles';
import { ApplicationEnvironmentContext } from './context/ApplicationEnvoronmentContext';

const App = () => {
  const applicationContext = useContext(ApplicationEnvironmentContext);
  const [spørsmal, settSpørsmal] = useState<any>([]);
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(
    !applicationContext.useAuthentication
  );
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  const checkToggle = (toggles: Toggles, toggleName: string) => {
    if (applicationContext.useToggles) {
      return toggles[toggleName];
    }
    return true;
  };

  useEffect(() => {
    const fetchData = () => {
      if (applicationContext.useAuthentication) {
        autentiser(settAutentisering);
      }
      client
        .fetch('*[_type == $type]', { type: 'sporsmal' })
        .then((res: any) => {
          settSpørsmal(res);
        })
        .catch((err: any) => {
          settError(true);
        });
      if (applicationContext.useToggles) hentToggles(settToggles);
      settFetching(false);
    };

    fetchData();
  }, [applicationContext]);

  const erSpørsmålDataHentet = spørsmal && spørsmal.length;

  if (!fetching && autentisert) {
    if (!error && erSpørsmålDataHentet) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>
              {checkToggle(toggles, ToggleName.vis_innsending) && <Søknad />}
              <Spørsmål sporsmalListe={spørsmal} steg={1} />
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
