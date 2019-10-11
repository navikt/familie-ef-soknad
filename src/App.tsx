import React, { useEffect, useState } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Spørsmål from './komponenter/Spørsmal';
import Søknad from './komponenter/Søknad';
import { client } from './utils/sanity';
import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';

const App = () => {
  const [spørsmal, settSpørsmal] = useState<any>([]);
  const [toggles, settToggles] = useState<any>({});
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
          console.error('Oh no, error occured: ', err);
          settError(true);
        });
      settToggles(hentToggles());
      settFetching(false);
    };
    fetchData();
  }, []);

  const erSpørsmålDataHentet = spørsmal && spørsmal.length;

  if (!fetching) {
    console.log('TOGGLES: ' + toggles);
    if (!error && erSpørsmålDataHentet) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>
              <Søknad />
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
