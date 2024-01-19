import { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import { oppdaterBarnMedLabel } from '../utils/søknad';
import { usePersonContext } from '../context/PersonContext';
import {
  verifiserAtBrukerErAutentisert,
  autentiseringsInterceptor,
} from '../utils/autentiseringogvalidering/autentisering';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import { useToggles } from '../context/TogglesContext';
import { Barn, PersonData } from '../models/søknad/person';
import { Helmet } from 'react-helmet';
import SøknadsdialogBarnetilsyn from './Søknadsdialog';
import { ESkjemanavn } from '../utils/skjemanavn';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Loader } from '@navikt/ds-react';
import { IBarn } from '../models/steg/barn';
import { ToggleName } from '../models/søknad/toggles';
import Environment from '../Environment';

const BarnetilsynApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const { fetchPersonData, error, settError, feilmelding, alvorlighetsgrad } =
    usePersonContext();
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

  const oppdaterSøknadMedBarn = (
    person: PersonData,
    barneliste: Barn[] | IBarn[]
  ) => {
    const barnMedLabels = oppdaterBarnMedLabel(barneliste as IBarn[], intl);

    settSøknad((prevSøknad) => {
      const prevBarn = prevSøknad.person.barn;

      const sortertBarnelistePåMedforelder = [...prevBarn, ...barnMedLabels];
      return {
        ...prevSøknad,
        person: { ...person, barn: sortertBarnelistePåMedforelder },
      };
    });
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch(() => {
      settError(true);
    });
  };

  useEffect(() => {
    Promise.all([
      fetchToggles(),
      fetchPersonData(oppdaterSøknadMedBarn, ESkjemanavn.Barnetilsyn),
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
            <title>
              {intl.formatMessage({ id: 'banner.tittel.barnetilsyn' })}
            </title>
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
