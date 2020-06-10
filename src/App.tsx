import React, { useEffect, useState } from 'react';
import Feilside from './components/feil/Feilside';
import hentToggles from './toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Søknadsdialog from './søknad/Søknadsdialog';
import TestsideInformasjon from './components/TestsideInformasjon';
import { hentPersonData } from './utils/søknad';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { ToggleName } from './models/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from './utils/autentisering';
import mockPersonMedBarn from './mock/person.json';
import { settLabelOgVerdi } from './utils/søknad';
import { standardLabelsBarn } from './helpers/labels';
import { useSøknad } from './context/SøknadContext';
import { useToggles } from './context/TogglesContext';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { person, settPerson } = usePersonContext();
  const { søknad, settSøknad, hentMellomlagretOvergangsstønad } = useSøknad();
  const { settToggles, toggles } = useToggles();
  const [barneliste, settBarneliste] = useState([]);

  autentiseringsInterceptor();

  const kallApi = () =>
    process.env.NODE_ENV !== 'development' ||
    process.env.REACT_APP_BRUK_API_I_DEV === 'true';

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  useEffect(() => {
    const fetchData = () => {
      hentToggles(settToggles).catch((err: Error) => {
        settError(true);
      });

      const fetchPersonData = () => {
        hentPersonData()
          .then((response) => {
            settPerson({
              type: PersonActionTypes.HENT_PERSON,
              payload: response,
            });
            settBarneliste(response.barn);
            hentMellomlagretOvergangsstønad()
              .then(() => settFetching(false))
              .catch(() => settFetching(false));
          })
          .catch(() => settError(true));
      };
      fetchPersonData();
    };
    fetchData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let mapBarn = kallApi() ? barneliste : mockPersonMedBarn.barn;

    const barnMedLabels = mapBarn.map((barn: any) => {
      const nyttBarn = settLabelOgVerdi(barn, standardLabelsBarn);

      return nyttBarn;
    });

    settSøknad({ ...søknad, person: { ...person, barn: barnMedLabels } });
    // eslint-disable-next-line
  }, [person, barneliste]);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          {!toggles[ToggleName.send_søknad] && <TestsideInformasjon />}
          <Switch>
            <Route path={'/'}>
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
