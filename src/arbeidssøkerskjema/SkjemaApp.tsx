import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentPersonDataArbeidssoker } from '../utils/søknad';
import { Routes, Route } from 'react-router-dom';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentiseringogvalidering/autentisering';
import Forside from './Forside';
import Spørsmål from './steg/1-Spørsmål';
import Oppsummering from './steg/2-Oppsummering';
import Kvittering from './steg/3-Kvittering';
import { SkjemaProvider } from './SkjemaContext';
import RedirectArbeidssoker from './routes/RedirectArbeidssoker';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState('');
  const [ident, settIdent] = useState<string>('');
  const [visningsnavn, settVisningsnavn] = useState<string>('');
  const personProps = {
    ident,
    visningsnavn,
  };

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  useEffect(() => {
    const fetchData = () => {
      const fetchPersonData = () => {
        hentPersonDataArbeidssoker()
          .then((response) => {
            settIdent(response.ident);
            settVisningsnavn(response.visningsnavn);

            settError(false);
            settFeilmelding('');
          })
          .catch((e) => {
            settError(true);
            settFeilmelding('skjema.feilmelding.uthenting');
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
            <Routes>
              <Route
                path={'/sporsmal'}
                element={
                  <RedirectArbeidssoker>
                    <Spørsmål ident={personProps.ident} />
                  </RedirectArbeidssoker>
                }
              />
              <Route
                path={'/oppsummering'}
                element={
                  <RedirectArbeidssoker>
                    <Oppsummering />
                  </RedirectArbeidssoker>
                }
              />
              <Route
                path={'/kvittering'}
                element={
                  <RedirectArbeidssoker>
                    <Kvittering />
                  </RedirectArbeidssoker>
                }
              />
              <Route
                path={'*'}
                element={<Forside visningsnavn={visningsnavn} />}
              />
            </Routes>
          </SkjemaProvider>
        </>
      );
    } else if (error) {
      return <Feilside tekstId={feilmelding} />;
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
