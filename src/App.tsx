import React, { useEffect, useState } from 'react';
import Feilside from './components/feil/Feilside';
import hentToggles from './toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Søknadsdialog from './overgangsstønad/Søknadsdialog';
import { hentPersonData, oppdaterBarnMedLabel } from './utils/søknad';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { ToggleName } from './models/søknad/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from './utils/autentiseringogvalidering/autentisering';
import mockPersonMedBarn from './mock/mockPerson.json';
import mockPersonUtenBarn from './mock/mockPersonUtenBarn.json';
import mockToggles from './mock/mockToggles.json';
import { useSøknad } from './context/SøknadContext';
import { useToggles } from './context/TogglesContext';
import { IPerson } from './models/søknad/person';
import { Helmet } from 'react-helmet';
import { erLokaltMedMock } from './utils/miljø';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { EAlvorlighetsgrad } from './models/felles/feilmelding';
import LocaleTekst from './language/LocaleTekst';
import { useIntl } from 'react-intl';
import { logAdressesperre } from './utils/amplitude';
import { ESkjemanavn } from './utils/skjemanavn';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string>('');
  const [
    alvorlighetsgrad,
    settAlvorlighetsgrad,
  ] = useState<EAlvorlighetsgrad>();
  const { settPerson } = usePersonContext();
  const { søknad, settSøknad, hentMellomlagretOvergangsstønad } = useSøknad();
  const { settToggles, toggles } = useToggles();

  const intl = useIntl();

  autentiseringsInterceptor();

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
      .catch((e) => {
        const feil = e.response?.data?.feil;

        if (feil === 'adressesperre') {
          logAdressesperre(ESkjemanavn.Overgangsstønad);
          settAlvorlighetsgrad(EAlvorlighetsgrad.INFO);
          settFeilmelding(
            intl.formatMessage({
              id: 'barnasbosted.feilmelding.adressebeskyttelse',
            })
          );
        } else {
          settFeilmelding(feil);
        }

        settError(true);
      });
  };

  const oppdaterSøknadMedBarn = (person: IPerson, barneliste: any[]) => {
    const barnMedLabels = oppdaterBarnMedLabel(barneliste);

    settSøknad({ ...søknad, person: { ...person, barn: barnMedLabels } });
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch((err: Error) => {
      settError(true);
    });
  };

  useEffect(() => {
    if (erLokaltMedMock()) {
      settPerson({
        type: PersonActionTypes.HENT_PERSON,
        payload: mockPersonUtenBarn,
      });
      oppdaterSøknadMedBarn(mockPersonUtenBarn, mockPersonMedBarn.barn);
      settToggles(mockToggles);
      settFetching(false);
      return;
    }
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
            <title>
              {intl.formatMessage({ id: 'banner.tittel.overgangsstønad' })}
            </title>
          </Helmet>

          {toggles[ToggleName.feilsituasjon] && (
            <AlertStripeFeil className={'varsel-feilsituasjon'}>
              <LocaleTekst tekst={'overgangsstønad.feilsituasjon'} />
            </AlertStripeFeil>
          )}
          <Switch>
            <Route path={'/'}>
              <Søknadsdialog />
            </Route>
          </Switch>
        </>
      );
    } else if (error) {
      return (
        <Feilside tekstId={feilmelding} alvorlighetsgrad={alvorlighetsgrad} />
      );
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
