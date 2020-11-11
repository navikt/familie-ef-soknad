import React, { useEffect } from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { injectIntl } from 'react-intl';
import VeilederSnakkeboble from '../arbeidssøkerskjema/VeilederSnakkeboble';
import { useSkolepengerSøknad } from './SkolepengerContext';
import Environment from '../Environment';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import LocaleTekst from '../language/LocaleTekst';
import { useForsideInnhold } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import Forsideinformasjon from '../søknad/forside/Forsideinformasjon';
import { ERouteSkolepenger, RoutesSkolepenger } from './routing/routes';
import { hentPath } from '../utils/routing';
import { logEvent } from '../utils/amplitude';

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const [locale] = useSpråkContext();
  const {
    mellomlagretSkolepenger,
    brukMellomlagretSkolepenger,
    nullstillMellomlagretSkolepenger,
    søknad,
    settSøknad,
  } = useSkolepengerSøknad();

  useEffect(() => {
    logEvent('sidevisning', {
      side: 'Forside',
      team: 'familie',
      app: 'SP-soknadsdialog',
    });
  }, []);

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };

  const forside = useForsideInnhold(ForsideType.skolepenger);

  const kanBrukeMellomlagretSøknad =
    mellomlagretSkolepenger !== undefined &&
    mellomlagretSkolepenger.søknad.person.hash === person.hash &&
    mellomlagretSkolepenger.modellVersjon ===
      Environment().modellVersjon.skolepenger;

  const disclaimer = forside['disclaimer_' + locale];
  const seksjon = forside['seksjon_' + locale];

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

          <Sidetittel>
            <LocaleTekst tekst={'skolepenger.overskrift'} />
          </Sidetittel>
          {kanBrukeMellomlagretSøknad && mellomlagretSkolepenger ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretSkolepenger.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretSkolepenger}
              nullstillMellomlagretSøknad={nullstillMellomlagretSkolepenger}
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
                hentPath(RoutesSkolepenger, ERouteSkolepenger.OmDeg) || ''
              }
            />
          )}
        </Panel>
      </main>
    </div>
  );
};

export default injectIntl(Forside);
