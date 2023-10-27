import React from 'react';
import { usePersonContext } from '../context/PersonContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import Environment from '../Environment';
import FortsettSøknad from '../søknad/forside/FortsettSøknad';
import { useMount } from '../utils/hooks';
import LocaleTekst from '../language/LocaleTekst';
import { logSidevisningBarnetilsyn } from '../utils/amplitude';
import { ESkjemanavn } from '../utils/skjemanavn';
import { FnrOgDnrTilAlder } from '../overgangsstønad/utils';
import { isIE } from 'react-device-detect';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { Alert, Panel, Heading } from '@navikt/ds-react';
import VeilederSnakkeboble from '../assets/VeilederSnakkeboble';
import styled from 'styled-components';
import { erNåværendeMånedMellomMåneder, nåværendeÅr } from '../utils/dato';
import { BarnetilsynInformasjon } from './BarnetilsynInformasjon';
import { AlertIE } from '../components/forside/AlertIE';
import { AlertUnderAtten } from '../components/forside/AlertUnderAtten';
import { VeilederBoks } from '../components/forside/VeilederBoks';

const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

const Forside: React.FC = () => {
  const intl = useLokalIntlContext();
  const erDagensDatoMellomMaiOgAugust = erNåværendeMånedMellomMåneder(5, 8);

  useMount(() => {
    if (!(kanBrukeMellomlagretSøknad && mellomlagretBarnetilsyn))
      logSidevisningBarnetilsyn('Forside');
    else {
      logSidevisningBarnetilsyn('FortsettMedMellomlagret');
    }
  });

  const { person } = usePersonContext();
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

  const kanBrukeMellomlagretSøknad =
    mellomlagretBarnetilsyn !== undefined &&
    mellomlagretBarnetilsyn.søknad.person.hash === person.hash &&
    mellomlagretBarnetilsyn.modellVersjon ===
      Environment().modellVersjon.barnetilsyn;

  return (
    <div className={'forside'}>
      <div className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <VeilederBoks />

          {alder < 18 && <AlertUnderAtten />}

          {isIE && <AlertIE />}

          <Heading level="1" size="xlarge">
            <LocaleTekst tekst={'barnetilsyn.sidetittel'} />
          </Heading>

          {erDagensDatoMellomMaiOgAugust && (
            <StyledAlert variant="info">
              <Heading spacing size="small" level="3">
                Søker du om stønad til barnetilsyn fra august {nåværendeÅr}?
              </Heading>
              For å få stønad fra august må du kunne dokumentere utgiftene til
              barnepass med faktura for denne måneden. Vi anbefaler derfor at du
              venter med å søke frem til du får fakturaen.
            </StyledAlert>
          )}

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
              <BarnetilsynInformasjon
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
