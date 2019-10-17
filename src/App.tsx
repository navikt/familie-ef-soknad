import React, { useEffect, useState } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Spørsmål from './komponenter/Spørsmal';
import Søknad from './komponenter/Søknad';
import { client } from './utils/sanity';
import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';
import autentiser from './authentication/authenticateApi';
import { ToggleName, Toggles } from './typer/toggles';

const App = () => {
  const [spørsmal, settSpørsmal] = useState<any>([]);
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch('*[_type == $type]', { type: 'sporsmal' })
        .then((res: any) => {
          settSpørsmal(res);
        })
        .catch((err: any) => {
          settError(true);
        });
      autentiser(settAutentisering);
      hentToggles(settToggles);
      settFetching(false);
    };
    fetchData();
  }, []);

  const erSpørsmålDataHentet = spørsmal && spørsmal.length;

  if (!fetching && autentisert) {
    if (!error && erSpørsmålDataHentet) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>
              {toggles[ToggleName.vis_innsending] && <Søknad />}
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
