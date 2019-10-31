import React, { useEffect, useState } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Søknad from './komponenter/Søknad';
import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';
import { ToggleName, Toggles } from './typer/toggles';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      hentToggles(settToggles).catch((err: any) => {
        //settError(true);
      });
      settFetching(false);
    };
    fetchData();
  }, []);

  if (!fetching) {
    if (!error) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>{toggles[ToggleName.vis_innsending] && <Søknad />}</div>
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
