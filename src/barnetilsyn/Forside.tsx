import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { injectIntl } from 'react-intl';
import VeilederSnakkeboble from '../arbeidssøkerskjema/VeilederSnakkeboble';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import Environment from '../Environment';
import Forsideinformasjon from './Forsideinformasjon';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import { useForsideInnhold } from '../utils/hooks';

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const [locale] = useSpråkContext();
  const {
    mellomlagretBarnetilsyn,
    brukMellomlagretBarnetilsyn,
    nullstillMellomlagretBarnetilsyn,
  } = useBarnetilsynSøknad();

  const forside: any = useForsideInnhold('forside_barnetilsyn');

  const kanBrukeMellomlagretSøknad =
    mellomlagretBarnetilsyn !== undefined &&
    mellomlagretBarnetilsyn.søknad.person.hash === person.hash &&
    mellomlagretBarnetilsyn.modellVersjon ===
      Environment().modellVersjon.barnetilsyn;

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
            Søknad om stønad til barnetilsyn for enslig mor eller far i arbeid
          </Sidetittel>
          {kanBrukeMellomlagretSøknad && mellomlagretBarnetilsyn ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretBarnetilsyn.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretBarnetilsyn}
              nullstillMellomlagretSøknad={nullstillMellomlagretBarnetilsyn}
            />
          ) : (
            <Forsideinformasjon
              seksjon={seksjon}
              disclaimer={disclaimer}
              person={person}
              intl={intl}
            />
          )}
        </Panel>
      </main>
    </div>
  );
};

export default injectIntl(Forside);
