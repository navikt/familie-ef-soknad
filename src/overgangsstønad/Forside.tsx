import React, { useEffect } from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { useSøknad } from '../context/SøknadContext';
import { useToggles } from '../context/TogglesContext';
import { ToggleName } from '../models/søknad/toggles';
import Forsideinformasjon from '../søknad/forside/Forsideinformasjon';
import { hentBeskjedMedNavn } from '../utils/språk';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import VeilederSnakkeboble from '../assets/VeilederSnakkeboble';
import Environment from '../Environment';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { isIE } from 'react-device-detect';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from './routing/routesOvergangsstonad';
import { useForsideInnhold } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import { hentPath } from '../utils/routing';
import { useIntl } from 'react-intl';
import { logEvent } from '../utils/amplitude';

const Forside: React.FC = () => {
  useEffect(() => {
    logEvent('sidevisning', {
      side: 'Forside',
      team: 'familie',
      app: 'OS-søknadsdialog',
    });
  }, []);

  const intl = useIntl();
  const { person } = usePersonContext();
  const {
    mellomlagretOvergangsstønad,
    brukMellomlagretOvergangsstønad,
    nullstillMellomlagretOvergangsstønad,
    søknad,
    settSøknad,
  } = useSøknad();
  const [locale] = useSpråkContext();
  const forside = useForsideInnhold(ForsideType.overgangsstønad);
  const { toggles } = useToggles();

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };

  const disclaimer = forside['disclaimer_' + locale];
  const seksjon = forside['seksjon_' + locale];

  const kanBrukeMellomlagretSøknad =
    mellomlagretOvergangsstønad !== undefined &&
    mellomlagretOvergangsstønad.søknad.person.hash === person.hash &&
    mellomlagretOvergangsstønad.modellVersjon ===
      Environment().modellVersjon.overgangsstønad;

  return (
    <div className={'forside'}>
      <main className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <div className="veileder">
            <VeilederSnakkeboble
              tekst={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'skjema.hei' })
              )}
            />
          </div>

          {isIE && (
            <div className="ie-feil">
              <AlertStripeFeil>
                Søknaden er ikke tilpasset nettleseren Internet Explorer. Vi
                anbefaler deg å bruke en annen nettleser, for eksempel Google
                Chrome, Safari eller Firefox.
              </AlertStripeFeil>
            </div>
          )}

          <Sidetittel>Søknad om overgangsstønad</Sidetittel>
          {kanBrukeMellomlagretSøknad && mellomlagretOvergangsstønad ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretOvergangsstønad.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretOvergangsstønad}
              nullstillMellomlagretSøknad={nullstillMellomlagretOvergangsstønad}
            />
          ) : (
            <Forsideinformasjon
              seksjon={seksjon}
              disclaimer={disclaimer}
              person={person}
              intl={intl}
              harBekreftet={søknad.harBekreftet}
              settBekreftelse={settBekreftelse}
              nesteSide={
                hentPath(RoutesOvergangsstonad, ERouteOvergangsstønad.OmDeg) ||
                ''
              }
            />
          )}
        </Panel>
      </main>
    </div>
  );
};

export default Forside;
