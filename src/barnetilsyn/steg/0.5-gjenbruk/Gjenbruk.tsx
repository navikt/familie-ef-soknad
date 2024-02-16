import React, { FC } from 'react';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from '../../routing/routesBarnetilsyn';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { BodyShort, GuidePanel, Panel } from '@navikt/ds-react';
import { hentPath } from '../../../utils/routing';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { GjenbrukKnapp } from './GjenbrukKnapp';
import styled from 'styled-components';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { KnappLocaleTekstOgNavigate } from '../../../components/knapper/KnappLocaleTekstOgNavigate';
import { hentTekst } from '../../../utils/søknad';

const Gjenbruk: FC = () => {
  useMount(() => logSidevisningBarnetilsyn('Gjenbruk'));
  const intl = useLokalIntlContext();
  const { søknad } = useBarnetilsynSøknad();

  const BodyShortContainer = styled.div`
    & > *:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  `;

  const KnappContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; // Aligns items to the start of the container
  `;

  const SenterContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const nesteSide = hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.OmDeg) || '';
  return (
    <div className={'forside'}>
      <div className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <GuidePanel poster>
            <BodyShortContainer>
              <BodyShort>
                {hentBeskjedMedNavn(
                  søknad.person.søker.forkortetNavn,
                  intl.formatMessage({ id: 'skjema.hei' })
                )}
              </BodyShort>

              <BodyShort>
                {hentTekst('tidligere.barnetilsyn.søknad.finnes', intl)}
              </BodyShort>

              <BodyShort>
                {hentTekst('gjenbruk.tidligere.barnetilsyn.søknad', intl)}
              </BodyShort>
            </BodyShortContainer>
            <SenterContainer>
              <KnappContainer>
                <GjenbrukKnapp nesteSide={nesteSide} />
                <KnappLocaleTekstOgNavigate
                  nesteSide={nesteSide}
                  tekst="knapp.startTom"
                  variant="secondary"
                  logEventNavn="Klikker på start tom søknad"
                />
              </KnappContainer>
            </SenterContainer>
          </GuidePanel>
        </Panel>
      </div>
    </div>
  );
};

export default Gjenbruk;
