import { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import { hentTekst, oppdaterBarnMedLabel } from '../utils/søknad';
import { usePersonContext } from '../context/PersonContext';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentiseringogvalidering/autentisering';
import { useSkolepengerSøknad } from './SkolepengerContext';
import { useToggles } from '../context/TogglesContext';
import { IPerson } from '../models/søknad/person';
import { Helmet } from 'react-helmet';
import SøknadsdialogSkolepenger from './Søknadsdialog';
import { ESkjemanavn } from '../utils/skjemanavn';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Loader } from '@navikt/ds-react';
import { IBarn } from '../models/steg/barn';

const SkolepengerApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const { fetchPersonData, error, settError, feilmelding, alvorlighetsgrad } =
    usePersonContext();
  const { søknad, settSøknad, hentMellomlagretSkolepenger } =
    useSkolepengerSøknad();
  const { settToggles } = useToggles();
  const intl = useLokalIntlContext();

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const oppdaterSøknadMedBarn = (person: IPerson, barneliste: IBarn[]) => {
    const barnMedLabels = oppdaterBarnMedLabel(barneliste, intl);

    settSøknad &&
      settSøknad({ ...søknad, person: { ...person, barn: barnMedLabels } });
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch(() => {
      settError(true);
    });
  };

  useEffect(() => {
    Promise.all([
      fetchToggles(),
      fetchPersonData(oppdaterSøknadMedBarn, ESkjemanavn.Skolepenger),
      hentMellomlagretSkolepenger(),
    ])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
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
