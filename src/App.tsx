import React, { useEffect, useState } from 'react';
import Feilside from './komponenter/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Sporsmal from './komponenter/Spørsmal';
import Søknad from './komponenter/Søknad';
import { client } from './utils/sanity';
import { Panel } from 'nav-frontend-paneler';

const App = () => {
  const [sporsmal, settSporsmal] = useState<any>([]);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch('*[_type == $type]', { type: 'sporsmal' })
        .then((res: any) => {
          console.log(res);
          settSporsmal(res);
        })
        .catch((err: any) => {
          console.error('Oh no, error occured: ', err);
          settError(true);
        });
      settFetching(false);
    };
    fetchData();
  }, []);

  const erSpørsmålDataHentet = sporsmal && sporsmal.length;

  if (!fetching) {
    if (!error && erSpørsmålDataHentet) {
      return (
        <div className="app">
          <Panel className="innholdspanel">
            <div>
              <Søknad />
              <Sporsmal sporsmalListe={sporsmal} steg={1} />
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
