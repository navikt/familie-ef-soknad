import React from 'react';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { hentTekst } from '../utils/søknad';
import { useNavigate } from 'react-router-dom';
import LocaleTekst from '../language/LocaleTekst';
import {
  ERouteArbeidssøkerskjema,
  RoutesArbeidssokerskjema,
} from './routes/routesArbeidssokerskjema';
import VeilederSnakkeboble from './VeilederSnakkeboble';
import { useSkjema } from './SkjemaContext';
import { useForsideInnhold, useMount } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import { hentPath } from '../utils/routing';
import Språkvelger from '../components/språkvelger/Språkvelger';
import { logSidevisningArbeidssokerskjema } from '../utils/amplitude';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import {
  Accordion,
  BodyShort,
  Button,
  ConfirmationPanel,
  Heading,
  Panel,
} from '@navikt/ds-react';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';

const DisclaimerTittel = styled(Heading)`
  margin-bottom: 1rem;
`;

const StyledConfirmationPanel = styled(ConfirmationPanel)`
  margin-bottom: 2rem;
`;

const Forside: React.FC<any> = ({ visningsnavn }) => {
  const [locale] = useSpråkContext();
  const navigate = useNavigate();
  const intl = useLokalIntlContext();

  const { skjema, settSkjema } = useSkjema();

  useMount(() => logSidevisningArbeidssokerskjema('Forside'));

  const settBekreftelse = (bekreftelse: boolean) => {
    settSkjema({
      ...skjema,
      harBekreftet: bekreftelse,
    });
  };
  const forside = useForsideInnhold(ForsideType.arbeidssøker);

  const disclaimer = forside['disclaimer_' + locale];
  const seksjon = forside['seksjon_' + locale];

  return (
    <div className={'forside'}>
      <div className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <div className="veileder">
            <VeilederSnakkeboble
              tekst={hentBeskjedMedNavn(
                visningsnavn,
                intl.formatMessage({ id: 'skjema.hei' })
              )}
            />
          </div>
          <FeltGruppe>
            <Språkvelger />
          </FeltGruppe>
          <Heading size="xlarge">
            <LocaleTekst tekst={'skjema.sidetittel'} />
          </Heading>
          {seksjon &&
            seksjon.map((blokk: any, index: number) => {
              return blokk._type === 'dokumentasjonskrav' ? (
                <div className="seksjon" key={index}>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Header>{blokk.tittel}</Accordion.Header>
                      <Accordion.Content>
                        <BodyShort>
                          <PortableText value={blokk.innhold} />
                        </BodyShort>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ) : (
                <div className="seksjon" key={index}>
                  {blokk.tittel && (
                    <Heading level="2" size="small">
                      {blokk.tittel}
                    </Heading>
                  )}
                  <BodyShort>
                    <PortableText value={blokk.innhold} />
                  </BodyShort>
                </div>
              );
            })}

          {disclaimer && (
            <>
              <DisclaimerTittel level="2" size="small">
                {hentTekst('skjema.forside.disclaimer.tittel', intl)}
              </DisclaimerTittel>
              <StyledConfirmationPanel
                checked={!!skjema.harBekreftet}
                label={hentBeskjedMedNavn(
                  visningsnavn,
                  intl.formatMessage({ id: 'side.bekreftelse' })
                )}
                onChange={() => settBekreftelse(!skjema.harBekreftet)}
              >
                <BodyShort>
                  <PortableText value={disclaimer} />
                </BodyShort>
              </StyledConfirmationPanel>
            </>
          )}

          {skjema.harBekreftet ? (
            <FeltGruppe classname={'sentrert'} aria-live="polite">
              <Button
                onClick={() =>
                  navigate({
                    pathname: hentPath(
                      RoutesArbeidssokerskjema,
                      ERouteArbeidssøkerskjema.Spørsmål
                    ),
                  })
                }
                variant="primary"
              >
                <LocaleTekst tekst={'skjema.knapp.start'} />
              </Button>
            </FeltGruppe>
          ) : null}
        </Panel>
      </div>
    </div>
  );
};

export default Forside;
