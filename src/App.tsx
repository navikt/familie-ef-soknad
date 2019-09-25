import React, { useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './komponenter/Feilside';
import Sporsmal from './komponenter/Sporsmal';
import Soknad from './komponenter/Soknad';
import { client } from './utils/sanity';

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

  console.log('testing app sporsmal', sporsmal);

  if (!fetching) {
    if (!error && sporsmal && sporsmal.length) {
      return (
        <div className="app">
          <div className="sporsmal-container">
            <Soknad message={'Hei API'} />
            <Sporsmal sporsmalListe={sporsmal} steg={1} />
          </div>
        </div>
      );
    } else {
      return <Feilside />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
