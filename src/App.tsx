import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Banner from './components/Banner';
import Feilside from './components/feilside/Feilside';
import hentToggles from './toggles/api';
import autentiser from './authentication/authenticateApi';
import { ToggleName, Toggles } from './models/toggles';
import Environment from './Environment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Språkvelger from './components/språkvelger/Språkvelger';
import Søknad from './søknad/Søknad';
import { hentPersonData } from './utils/søknad';
import useSøknadContext from './context/SøknadContext';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import TestsideInformasjon from './components/TestsideInformasjon';

const brukToggles = process.env.REACT_APP_BRUK_TOGGLES === 'true';
const brukAutentisering = process.env.REACT_APP_BRUK_AUTENTISERING === 'true';

function er401Feil(error: any) {
  return error && error.response && error.response.status === 401;
}

const App = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (er401Feil(error) && brukAutentisering) {
        settAutentisering(false);
        window.location.href = Environment().loginService; //+ '?redirect=' + window.location.href;
      } else {
        return error;
      }
    }
  );

  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(
    !brukAutentisering
  );
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  const { person, settPerson } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();

  const checkToggle = (toggles: Toggles, toggleName: string) => {
    if (brukToggles) {
      return toggles[toggleName];
    }
    return true;
  };

  useEffect(() => {
    const fetchData = () => {
      if (brukToggles) {
        hentToggles(settToggles);
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
    settError(false);
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    settSøknad({ ...søknad, person: person });
    // eslint-disable-next-line
  }, [person]);

  useEffect(() => {
    if (brukAutentisering && !autentisert) {
      autentiser(settAutentisering);
    }
  }, [autentisert]);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <div className="app">
          <Banner tittel={'Enslig forsørger'} />
          <Språkvelger />
          <TestsideInformasjon />
          {checkToggle(toggles, ToggleName.vis_innsending) ? <Søknad /> : <></>}
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
