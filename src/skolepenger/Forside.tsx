import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
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
import { logSidevisningSkolepenger } from '../utils/amplitude';
import { useMount } from '../utils/hooks';
import { ESkjemanavn } from '../utils/skjemanavn';
import { FnrOgDnrTilAlder } from '../overgangsstønad/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useLokalIntlContext } from '../context/LokalIntlContext';

const Forside: React.FC<any> = () => {
  const { person } = usePersonContext();
  const [locale] = useSpråkContext();
  const intl = useLokalIntlContext();
  const {
    mellomlagretSkolepenger,
    brukMellomlagretSkolepenger,
    nullstillMellomlagretSkolepenger,
    søknad,
    settSøknad,
  } = useSkolepengerSøknad();

  useMount(() => {
    if (!(kanBrukeMellomlagretSøknad && mellomlagretSkolepenger))
      logSidevisningSkolepenger('Forside');
    else {
      logSidevisningSkolepenger('FortsettMedMellomlagret');
    }
  });

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };

  const alder = FnrOgDnrTilAlder(person.søker.fnr);

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

          <Sidetittel>
            <LocaleTekst tekst={'skolepenger.overskrift'} />
          </Sidetittel>
          {kanBrukeMellomlagretSøknad && mellomlagretSkolepenger ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretSkolepenger.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretSkolepenger}
              nullstillMellomlagretSøknad={nullstillMellomlagretSkolepenger}
              skjemanavn={ESkjemanavn.Skolepenger}
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
                  hentPath(RoutesSkolepenger, ERouteSkolepenger.OmDeg) || ''
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
