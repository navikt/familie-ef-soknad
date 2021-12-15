import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { useSøknad } from '../context/SøknadContext';
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
import { logSidevisningOvergangsstonad } from '../utils/amplitude';
import LocaleTekst from '../language/LocaleTekst';
import { useMount } from '../utils/hooks';
import { ESkjemanavn } from '../utils/skjemanavn';

const FnrTilAlder = (fnr: string): number => {
  const nå = new Date();

  const årNå = nå.getFullYear();
  const månedNå = nå.getMonth() + 1;
  const dagNå = nå.getDate();

  const dag = parseInt(fnr.substring(0, 2), 10);
  const måned = parseInt(fnr.substring(2, 4), 10);
  const stringÅr = fnr.substring(4, 6);

  const år =
    stringÅr[0] === '0'
      ? parseInt('20' + stringÅr, 10)
      : parseInt('19' + stringÅr, 10);

  let alder = årNå - år;

  if (månedNå < måned) {
    alder = alder - 1;
  }

  if (måned === månedNå && dagNå < dag) {
    alder = alder - 1;
  }

  return alder;
};

const Forside: React.FC = () => {
  useMount(() => {
    if (!(kanBrukeMellomlagretSøknad && mellomlagretOvergangsstønad))
      logSidevisningOvergangsstonad('Forside');
    else {
      logSidevisningOvergangsstonad('FortsettMedMellomlagret');
    }
  });

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

  const alder = FnrTilAlder(person.søker.fnr);

  return (
    <div className={'forside'}>
      <div className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <div className="veileder">
            <VeilederSnakkeboble
              tekst={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'skjema.hei' })
              )}
            />
          </div>

          {alder < 18 && (
            <div className="ie-feil">
              <AlertStripeFeil>
                <LocaleTekst tekst={'side.alert.ikkeGammelNok'} />
              </AlertStripeFeil>
            </div>
          )}

          {isIE && (
            <div className="ie-feil">
              <AlertStripeFeil>
                <LocaleTekst tekst={'side.alert.plsnoIE'} />
              </AlertStripeFeil>
            </div>
          )}

          <Sidetittel>
            <LocaleTekst tekst="banner.tittel.overgangsstønad" />
          </Sidetittel>
          {kanBrukeMellomlagretSøknad && mellomlagretOvergangsstønad ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretOvergangsstønad.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretOvergangsstønad}
              nullstillMellomlagretSøknad={nullstillMellomlagretOvergangsstønad}
              skjemanavn={ESkjemanavn.Overgangsstønad}
            />
          ) : (
            alder > 17 && (
              <Forsideinformasjon
                seksjon={seksjon}
                disclaimer={disclaimer}
                person={person}
                intl={intl}
                harBekreftet={søknad.harBekreftet}
                settBekreftelse={settBekreftelse}
                nesteSide={
                  hentPath(
                    RoutesOvergangsstonad,
                    ERouteOvergangsstønad.OmDeg
                  ) || ''
                }
              />
            )
          )}
        </Panel>
      </div>
    </div>
  );
};

export default Forside;
