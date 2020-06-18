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
import { IPerson } from './models/person';
import { Helmet } from 'react-helmet';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { settPerson } = usePersonContext();
  const { søknad, settSøknad, hentMellomlagretOvergangsstønad } = useSøknad();
  const { settToggles, toggles } = useToggles();

  autentiseringsInterceptor();

  const dataFraApi = () =>
    process.env.NODE_ENV !== 'development' ||
    process.env.REACT_APP_BRUK_API_I_DEV === 'true';

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const fetchPersonData = () => {
    return hentPersonData()
      .then((response) => {
        settPerson({
          type: PersonActionTypes.HENT_PERSON,
          payload: response,
        });
        oppdaterSøknadMedBarn(response, response.barn);
      })
      .catch(() => settError(true));
  };

  const oppdaterSøknadMedBarn = (person: IPerson, barneliste: any[]) => {
    const mapBarn = dataFraApi() ? barneliste : mockPersonMedBarn.barn;

    const barnMedLabels = mapBarn.map((barn: any) => {
      return settLabelOgVerdi(barn, standardLabelsBarn);
    });

    settSøknad({ ...søknad, person: { ...person, barn: barnMedLabels } });
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch((err: Error) => {
      settError(true);
    });
  };

  useEffect(() => {
    Promise.all([
      fetchToggles(),
      fetchPersonData(),
      hentMellomlagretOvergangsstønad(),
    ])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
    // eslint-disable-next-line
  }, []);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          <Helmet>
            <title>Søknad om overgangsstønad</title>
          </Helmet>

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
