import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import TestsideInformasjon from '../components/TestsideInformasjon';
import { hentPersonData } from '../utils/søknad';
import { PersonActionTypes, usePersonContext } from '../context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { Toggles } from '../models/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentisering';
import Forside from './Forside';
import { SkjemaProvider } from './SkjemaContext';
import Spørsmål from './Spørsmål';
import Oppsummering from './Oppsummering';
import Kvittering from './Kvittering';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { person, settPerson } = usePersonContext();

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  useEffect(() => {
    const fetchData = () => {
      hentToggles(settToggles).catch((err: Error) => {
        settError(false);
      });

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
    // eslint-disable-next-line
  }, []);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          <SkjemaProvider>
            <TestsideInformasjon />
            <Switch>
              <Route exact path={'/arbeidssøker'}>
                <Forside />
              </Route>
              <Route path={'/arbeidssøker/spørsmål'}>
                <Spørsmål />
              </Route>
              <Route path={'/arbeidssøker/oppsummering'}>
                <Oppsummering />
              </Route>
              <Route path={'/arbeidssøker/kvittering'}>
                <Kvittering />
              </Route>
            </Switch>
          </SkjemaProvider>
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
