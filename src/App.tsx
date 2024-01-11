import { useEffect, useState } from 'react';
import Feilside from './components/feil/Feilside';
import hentToggles from './toggles/api';
import Søknadsdialog from './overgangsstønad/Søknadsdialog';
import { oppdaterBarnMedLabel } from './utils/søknad';
import { usePersonContext } from './context/PersonContext';
import { ToggleName } from './models/søknad/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from './utils/autentiseringogvalidering/autentisering';
import { useSøknad } from './context/SøknadContext';
import { useToggles } from './context/TogglesContext';
import { Barn, PersonData } from './models/søknad/person';
import { Helmet } from 'react-helmet';
import LocaleTekst from './language/LocaleTekst';
import { useLokalIntlContext } from './context/LokalIntlContext';
import { Alert, Loader } from '@navikt/ds-react';
import { IBarn } from './models/steg/barn';
import { ESkjemanavn } from './utils/skjemanavn';

const App = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const { fetchPersonData, error, settError, feilmelding, alvorlighetsgrad } =
    usePersonContext();
  const { settSøknad, hentMellomlagretOvergangsstønad } = useSøknad();
  const { settToggles, toggles } = useToggles();

  const intl = useLokalIntlContext();
  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const oppdaterSøknadMedBarn = (
    person: PersonData,
    barneliste: Barn[] | IBarn[]
  ) => {
    const barnMedLabels = oppdaterBarnMedLabel(barneliste as IBarn[], intl);

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
      fetchPersonData(oppdaterSøknadMedBarn, ESkjemanavn.Overgangsstønad),
      hentMellomlagretOvergangsstønad(),
    ])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
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
