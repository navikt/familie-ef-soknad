import React from 'react';
import { usePersonContext } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import VeilederSnakkeboble from '../assets/VeilederSnakkeboble';
import Environment from '../Environment';
import { isIE } from 'react-device-detect';
import { logSidevisningOvergangsstonad } from '../utils/amplitude';
import LocaleTekst from '../language/LocaleTekst';
import { useMount } from '../utils/hooks';
import { ESkjemanavn } from '../utils/skjemanavn';
import { FnrOgDnrTilAlder } from './utils';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Alert, Panel, Heading } from '@navikt/ds-react';
import { OvergangsstønadInformasjon } from './OvergangsstønadInformasjon';

const Forside: React.FC = () => {
  useMount(() => {
    if (!(kanBrukeMellomlagretSøknad && mellomlagretOvergangsstønad))
      logSidevisningOvergangsstonad('Forside');
    else {
      logSidevisningOvergangsstonad('FortsettMedMellomlagret');
    }
  });

  const intl = useLokalIntlContext();
  const { person } = usePersonContext();
  const {
    mellomlagretOvergangsstønad,
    brukMellomlagretOvergangsstønad,
    nullstillMellomlagretOvergangsstønad,
    søknad,
    settSøknad,
  } = useSøknad();

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };

  const kanBrukeMellomlagretSøknad =
    mellomlagretOvergangsstønad !== undefined &&
    mellomlagretOvergangsstønad.søknad.person.hash === person.hash &&
    mellomlagretOvergangsstønad.modellVersjon ===
      Environment().modellVersjon.overgangsstønad;

  const alder = FnrOgDnrTilAlder(person.søker.fnr);

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
              <Alert size="small" variant="error">
                <LocaleTekst tekst={'side.alert.ikkeGammelNok'} />
              </Alert>
            </div>
          )}

          {isIE && (
            <div className="ie-feil">
              <Alert size="small" variant="error">
                <LocaleTekst tekst={'side.alert.plsnoIE'} />
              </Alert>
            </div>
          )}

          <Heading level="1" size="xlarge">
            <LocaleTekst tekst="banner.tittel.overgangsstønad" />
          </Heading>
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
              <OvergangsstønadInformasjon
                person={person}
                harBekreftet={søknad.harBekreftet}
                settBekreftelse={settBekreftelse}
              />
            )
          )}
        </Panel>
      </div>
    </div>
  );
};

export default Forside;
