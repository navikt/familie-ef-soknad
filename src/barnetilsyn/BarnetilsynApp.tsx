import { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import { hentPersonData, oppdaterBarnMedLabel } from '../utils/søknad';
import { PersonActionTypes, usePersonContext } from '../context/PersonContext';
import {
  verifiserAtBrukerErAutentisert,
  autentiseringsInterceptor,
} from '../utils/autentiseringogvalidering/autentisering';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import { useToggles } from '../context/TogglesContext';
import { IPerson } from '../models/søknad/person';
import { Helmet } from 'react-helmet';
import SøknadsdialogBarnetilsyn from './Søknadsdialog';
import { EAlvorlighetsgrad } from '../models/felles/feilmelding';
import { logAdressesperre } from '../utils/amplitude';
import { ESkjemanavn } from '../utils/skjemanavn';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Loader } from '@navikt/ds-react';
import { IBarn } from '../models/steg/barn';
import { ToggleName } from '../models/søknad/toggles';
import Environment from '../Environment';
import { consoleLogLokaltOgDev } from '../utils/logLokaltOgDev';

const BarnetilsynApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string>('');
  const [alvorlighetsgrad, settAlvorlighetsgrad] =
    useState<EAlvorlighetsgrad>();
  const { settPerson } = usePersonContext();
  const {
    settSøknad,
    hentMellomlagretBarnetilsyn,
    hentForrigeSøknadBarnetilsyn,
  } = useBarnetilsynSøknad();
  const { toggles, settToggles } = useToggles();
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
        consoleLogLokaltOgDev(response, 'response fra fetchPersonData');
        oppdaterSøknadMedBarn(response, response.barn);
      })
      .catch((e) => {
        const feil = e.response?.data?.feil;

        if (feil === 'adressesperre') {
          logAdressesperre(ESkjemanavn.Barnetilsyn);
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

    settSøknad &&
      settSøknad((prevSøknad) => ({
        ...prevSøknad,
        person: { ...person, barn: barnMedLabels },
      }));
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
      hentMellomlagretBarnetilsyn(),
    ])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
  }, []);

  useEffect(() => {
    if (
      toggles[ToggleName.hentBarnetilsynSøknad] ||
      Environment().miljø === 'local'
    ) {
      hentForrigeSøknadBarnetilsyn();
    }
  }, [fetching]);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          <Helmet>
            <title>Søknad om barnetilsyn</title>
          </Helmet>

          <SøknadsdialogBarnetilsyn />
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

export default BarnetilsynApp;
