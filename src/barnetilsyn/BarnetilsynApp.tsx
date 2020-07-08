import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentPersonData } from '../utils/søknad';
import { PersonActionTypes, usePersonContext } from '../context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { ToggleName, Toggles } from '../models/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentisering';
import Forside from './Forside';
import { SkjemaProvider } from './SkjemaContext';
import OmDeg from './steg/1-omdeg/OmDeg';

const App = () => {
  const [toggles, settToggles] = useState<Toggles>({});
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState('');
  const { settPerson } = usePersonContext();

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
        hentPersonData()
          .then((response) => {
            settPerson({
              type: PersonActionTypes.HENT_PERSON,
              payload: response,
            });
            settError(false);
            settFeilmelding('');
          })
          .catch((e) => {
            settError(false);
            settFeilmelding(
              'En feil oppstod ved uthenting av dine personopplysninger'
            );
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
            <Switch>
              <Route exact path={'/barnetilsyn'}>
                <Forside />
                {toggles[ToggleName.vis_innsending] && <Forside />}
              </Route>
              <Route path={'/barnetilsyn/om-deg'}>
                <OmDeg />
              </Route>
            </Switch>
          </SkjemaProvider>
        </>
      );
    } else if (error) {
      return <Feilside tekst={feilmelding} />;
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
