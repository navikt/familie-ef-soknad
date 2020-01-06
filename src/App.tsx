import React, { useEffect, useState } from 'react';
import Feilside from './components/feilside/Feilside';
import hentToggles from './toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Søknadsdialog from './søknad/Søknadsdialog';
import TestsideInformasjon from './components/TestsideInformasjon';
import useSøknadContext from './context/SøknadContext';
import { hentPersonData } from './utils/søknad';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { ToggleName, Toggles } from './models/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from './utils/autentisering';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { person, settPerson } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  useEffect(() => {
    const fetchData = () => {
      hentToggles(settToggles).catch((err: Error) => {
        //settError(true);
      });

      const fetchPersonData = () => {
        hentPersonData().then((response) => {
          settPerson({
            type: PersonActionTypes.HENT_PERSON,
            payload: response,
          });
        });
      };
      //fetchPersonData();
      settFetching(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    settSøknad({ ...søknad, person: person });
    // eslint-disable-next-line
  }, [person]);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          <TestsideInformasjon />
          <Switch>
            <Route path={'/'}>
              <Søknadsdialog />
              {toggles[ToggleName.vis_innsending] && <Søknadsdialog />}
            </Route>
          </Switch>
        </>
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
