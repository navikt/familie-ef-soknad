import { useEffect, useState } from 'react';
import Feilside from './components/feil/Feilside';
import hentToggles from './toggles/api';
import Søknadsdialog from './overgangsstønad/Søknadsdialog';
import { hentPersonData, oppdaterBarnMedLabel } from './utils/søknad';
import { PersonActionTypes, usePersonContext } from './context/PersonContext';
import { ToggleName } from './models/søknad/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from './utils/autentiseringogvalidering/autentisering';
import { useSøknad } from './context/SøknadContext';
import { useToggles } from './context/TogglesContext';
import { IPerson } from './models/søknad/person';
import { Helmet } from 'react-helmet';
import { EAlvorlighetsgrad } from './models/felles/feilmelding';
import LocaleTekst from './language/LocaleTekst';
import { logAdressesperre } from './utils/amplitude';
import { ESkjemanavn } from './utils/skjemanavn';
import { useLokalIntlContext } from './context/LokalIntlContext';
import { Alert, Loader } from '@navikt/ds-react';
import { IBarn } from './models/steg/barn';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string>('');
  const [alvorlighetsgrad, settAlvorlighetsgrad] = useState<
    EAlvorlighetsgrad | undefined
  >(undefined);
  const { settPerson } = usePersonContext();
  const { settSøknad, hentMellomlagretOvergangsstønad } = useSøknad();
  const { settToggles, toggles } = useToggles();

  const intl = useLokalIntlContext();

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

  const oppdaterSøknadMedBarn = (person: IPerson, barneliste: IBarn[]) => {
    const barnMedLabels = oppdaterBarnMedLabel(barneliste, intl);

    settSøknad((prevSøknad) => ({
      ...prevSøknad,
      person: { ...person, barn: barnMedLabels },
    }));
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch(() => {
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
            <title>
              {intl.formatMessage({ id: 'banner.tittel.overgangsstønad' })}
            </title>
          </Helmet>

          {toggles[ToggleName.feilsituasjon] && (
            <Alert size="small" variant="error">
              <LocaleTekst tekst={'overgangsstønad.feilsituasjon'} />
            </Alert>
          )}
          <Søknadsdialog />
        </>
      );
    } else if (error) {
      return (
        <Feilside tekstId={feilmelding} alvorlighetsgrad={alvorlighetsgrad} />
      );
    } else {
      return <Loader variant="neutral" size="xlarge" title="venter..." />;
    }
  } else {
    return <Loader variant="neutral" size="xlarge" title="venter..." />;
  }
};

export default App;
