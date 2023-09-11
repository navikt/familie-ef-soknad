import React from 'react';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import Environment from '../Environment';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import { useForsideInnhold, useMount } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from './routing/routesBarnetilsyn';
import Forsideinformasjon from '../søknad/forside/Forsideinformasjon';
import { hentPath } from '../utils/routing';
import LocaleTekst from '../language/LocaleTekst';
import { logSidevisningBarnetilsyn } from '../utils/amplitude';
import { ESkjemanavn } from '../utils/skjemanavn';
import { FnrOgDnrTilAlder } from '../overgangsstønad/utils';
import { isIE } from 'react-device-detect';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Alert, Panel, Heading } from '@navikt/ds-react';
import VeilederSnakkeboble from '../assets/VeilederSnakkeboble';
import styled from 'styled-components';
import {
  nåværendeÅr,
  useErMellomStartenAvMaiOgSluttenAvAugust,
} from '../utils/dato';

const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

const Forside: React.FC<any> = () => {
  const intl = useLokalIntlContext();
  const erMellomStartenAvMaiOgSluttenAvAugust =
    useErMellomStartenAvMaiOgSluttenAvAugust();

  useMount(() => {
    if (!(kanBrukeMellomlagretSøknad && mellomlagretBarnetilsyn))
      logSidevisningBarnetilsyn('Forside');
    else {
      logSidevisningBarnetilsyn('FortsettMedMellomlagret');
    }
  });

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

  const alder = FnrOgDnrTilAlder(person.søker.fnr);

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
            <LocaleTekst tekst={'barnetilsyn.sidetittel'} />
          </Heading>

          {erMellomStartenAvMaiOgSluttenAvAugust ? (
            <StyledAlert variant="info">
              <Heading spacing size="small" level="3">
                Søker du om stønad til barnetilsyn fra august {nåværendeÅr}?
              </Heading>
              For å få stønad fra august må du kunne dokumentere utgiftene til
              barnepass med faktura for denne måneden. Vi anbefaler derfor at du
              venter med å søke frem til du får fakturaen.
            </StyledAlert>
          ) : null}

          {kanBrukeMellomlagretSøknad && mellomlagretBarnetilsyn ? (
            <FortsettSøknad
              intl={intl}
              gjeldendeSteg={mellomlagretBarnetilsyn.gjeldendeSteg}
              brukMellomlagretSøknad={brukMellomlagretBarnetilsyn}
              nullstillMellomlagretSøknad={nullstillMellomlagretBarnetilsyn}
              skjemanavn={ESkjemanavn.Barnetilsyn}
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
                  hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.OmDeg) || ''
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
