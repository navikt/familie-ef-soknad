import { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import {
  hentPersonData,
  hentTekst,
  oppdaterBarnMedLabel,
} from '../utils/søknad';
import { PersonActionTypes, usePersonContext } from '../context/PersonContext';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentiseringogvalidering/autentisering';
import mockPersonMedBarn from '../mock/mockPerson.json';
import mockPersonUtenBarn from '../mock/mockPersonUtenBarn.json';
import mockToggles from '../mock/mockToggles.json';
import { useSkolepengerSøknad } from './SkolepengerContext';
import { useToggles } from '../context/TogglesContext';
import { IPerson } from '../models/søknad/person';
import { Helmet } from 'react-helmet';
import { erLokaltMedMock } from '../utils/miljø';
import SøknadsdialogSkolepenger from './Søknadsdialog';
import { logAdressesperre } from '../utils/amplitude';
import { EAlvorlighetsgrad } from '../models/felles/feilmelding';
import { ESkjemanavn } from '../utils/skjemanavn';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Loader } from '@navikt/ds-react';

const SkolepengerApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [feilmelding, settFeilmelding] = useState<string>('');
  const [alvorlighetsgrad, settAlvorlighetsgrad] =
    useState<EAlvorlighetsgrad>();
  const { settPerson } = usePersonContext();
  const { søknad, settSøknad, hentMellomlagretSkolepenger } =
    useSkolepengerSøknad();
  const { settToggles } = useToggles();
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
          logAdressesperre(ESkjemanavn.Skolepenger);
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
    const barnMedLabels = oppdaterBarnMedLabel(barneliste, intl);

    settSøknad &&
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
      hentMellomlagretSkolepenger(),
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
            <title>{hentTekst('skolepenger.sidetittel', intl)}</title>
          </Helmet>

          <SøknadsdialogSkolepenger />
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

export default SkolepengerApp;
