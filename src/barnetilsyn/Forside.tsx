import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { injectIntl } from 'react-intl';
import VeilederSnakkeboble from '../arbeidssøkerskjema/VeilederSnakkeboble';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import Environment from '../Environment';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import { useForsideInnhold } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from './routing/routesBarnetilsyn';
import Forsideinformasjon from '../søknad/forside/Forsideinformasjon';
import { hentPath } from '../utils/routing';
import LocaleTekst from '../language/LocaleTekst';
import { logSidevisningBarnetilsyn } from '../utils/amplitude';
import { useMount } from '../utils/hooks';

const Forside: React.FC<any> = ({ intl }) => {
  useMount(() => logSidevisningBarnetilsyn('Forside'));

  const { person } = usePersonContext();
  const [locale] = useSpråkContext();
  const {
    mellomlagretBarnetilsyn,
    brukMellomlagretBarnetilsyn,
    nullstillMellomlagretBarnetilsyn,
    søknad,
    settSøknad,
  } = useBarnetilsynSøknad();
  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };

  const forside: any = useForsideInnhold(ForsideType.barnetilsyn);

  const kanBrukeMellomlagretSøknad =
    mellomlagretBarnetilsyn !== undefined &&
    mellomlagretBarnetilsyn.søknad.person.hash === person.hash &&
    mellomlagretBarnetilsyn.modellVersjon ===
      Environment().modellVersjon.barnetilsyn;

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

          <Sidetittel>
            <LocaleTekst tekst={'barnetilsyn.sidetittel'} />
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
              harBekreftet={søknad.harBekreftet}
              settBekreftelse={settBekreftelse}
              nesteSide={
                hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.OmDeg) || ''
              }
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

export default injectIntl(Forside);
