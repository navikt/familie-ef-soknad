import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Feilside from './components/feilside/Feilside';
import hentToggles from './toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Språkvelger from './components/språkvelger/Språkvelger';
import Søknad from './søknad/Søknad';
import { ToggleName, Toggles } from './models/toggles';
import { hentPersonData } from './utils/søknad';
import useSøknadContext from './context/SøknadContext';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { person, settPerson } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();

  useEffect(() => {
    const fetchData = () => {
      hentToggles(settToggles).catch((err: Error) => {
        // settError(true);
      });
      const fetchPersonData = () => {
        hentPersonData().then((response) => {
          settPerson({
            type: PersonActionTypes.HENT_PERSON,
            payload: response,
          });
          settSøknad({ ...søknad, person: response });
        });
      };
      if (person) {
        fetchPersonData();
      }
      settFetching(false);
    };

    settError(false);
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (!fetching) {
    if (!error) {
      return (
        <div className="app">
          <Banner tittel={'Enslig forsørger'} />
          <Språkvelger />
          <Søknad />
          {toggles[ToggleName.vis_innsending] && <Søknad />}
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
