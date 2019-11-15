import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Feilside from './components/feilside/Feilside';
import hentToggles from './toggles/api';
import autentiser from './authentication/authenticateApi';
import { ToggleName, Toggles } from './models/toggles';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Språkvelger from './components/språkvelger/Språkvelger';
import Søknad from './søknad/Søknad';
import { hentPersonData } from './utils/søknad';
import useSøknadContext from './context/SøknadContext';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import TestsideInformasjon from './components/TestsideInformasjon';
import { authInterceptor } from './utils/auth';
import { checkToggle } from './utils/toggle';

const brukToggles = process.env.REACT_APP_BRUK_TOGGLES === 'true';
const brukAutentisering = process.env.REACT_APP_BRUK_AUTENTISERING === 'true';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(
    !brukAutentisering
  );
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { person, settPerson } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();

  authInterceptor(brukAutentisering, settAutentisering);

  useEffect(() => {
    if (brukAutentisering && !autentisert) {
      autentiser(settAutentisering);
    }
  }, [autentisert]);

  useEffect(() => {
    const fetchData = () => {
      if (brukToggles) {
        hentToggles(settToggles).catch((err: Error) => {
          settError(true);
        });
      }
      const fetchPersonData = () => {
        hentPersonData().then((response) => {
          settPerson({
            type: PersonActionTypes.HENT_PERSON,
            payload: response,
          });
        });
      };
      fetchPersonData();
      settFetching(false);
    };
    fetchData();
  });

  useEffect(() => {
    settSøknad({ ...søknad, person: person });
    // eslint-disable-next-line
  }, [person]);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <div className="app">
          <Banner tittel={'Enslig forsørger'} />
          <Språkvelger />
          <TestsideInformasjon />
          {checkToggle(toggles, ToggleName.vis_innsending) && <Søknad />}
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
