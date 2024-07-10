import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Bleed,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Show,
  Stack,
  VStack,
} from '@navikt/ds-react';
import LocaleTekst from '../language/LocaleTekst';
import { usePersonContext } from '../context/PersonContext';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { hentBeskjedMedNavn } from '../utils/språk';

export const ForsideNy: React.FC = () => {
  const intl = useLokalIntlContext();
  const { person } = usePersonContext();

  const velkomstbeskjedMedNavn = hentBeskjedMedNavn(
    person.søker.forkortetNavn,
    intl.formatMessage({ id: 'skjema.hei' })
  );

  return (
    <Page>
      <Page.Block width="text" gutters>
        <VStack as="main" gap="8">
          <Bleed
            marginInline={{ lg: '24' }}
            data-aksel-template="form-intropage-v1"
          >
            <Stack
              gap="6"
              direction={{ sm: 'row-reverse', lg: 'row' }}
              justify={{ sm: 'space-between', lg: 'start' }}
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram />
              </Show>
              <VStack gap="1">
                {/*// TODO: Hva slags format er dette?*/}
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  <LocaleTekst tekst="banner.tittel.overgangsstønad" />
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
          <GuidePanel poster>
            <Heading level="2" size="medium" spacing>
              {velkomstbeskjedMedNavn}
            </Heading>
            <BodyLong spacing>
              Seksjonen GuidePanel brukes til en kort, overordnet veiledning til
              søkeren. Seksjonen henter inn søkerens navn, og gir en komprimert
              forklaring av pengestøtten, tiltaket eller hjelpemiddelet. Denne
              teksten hentes fra ingressen til produktsiden på nav.no.
            </BodyLong>
            <BodyLong>
              Avslutt teksten i seksjonen med en lenke til produktsiden på
              nav.no som åpnes i en ny fane.
            </BodyLong>
          </GuidePanel>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <BodyLong spacing>
              Denne seksjonen brukes til å gi søkerne informasjon de vil ha stor
              nytte av før de går i gang med søknaden. Eksempler på nyttig
              informasjon:
            </BodyLong>
            <List>
              <List.Item>
                Oppgaver brukeren må ha gjort før de søker.{' '}
                <i>
                  Du må ha meldt deg som arbeidssøker før du kan søke om
                  dagpenger.
                </i>
              </List.Item>
              <List.Item>
                Dokumentasjon brukeren kan bli bedt om.{' '}
                <i>
                  Noen av opplysningene du gir underveis vil du bli bedt om å
                  dokumentere. Du vil trenge xx og xx for å fullføre denne
                  søknaden.
                </i>
              </List.Item>
              <List.Item>
                Automatisk lagring.{' '}
                <i>
                  Vi lagrer svarene dine (xx timer) mens du fyller ut, så du kan
                  ta pauser underveis.
                </i>
              </List.Item>
              <List.Item>
                Antall steg og estimert tidsbruk.{' '}
                <i>
                  Det er XX steg i søknaden, og du kan regne med å bruke ca. XX
                  minutter.
                </i>
              </List.Item>
              <List.Item>
                Søknadsfrister. <i>Husk at du må søke om xx innen xx dager.</i>
              </List.Item>
              <List.Item>
                Saksbehandlingstider og info om gyldighet, krav osv.{' '}
                <i>
                  Vi bruker ca. xx uker på å behandle søknaden din. Husk at du
                  må sende meldekort xx ofte selv om du ikke har fått svar på
                  søknaden din om dagpenger ennå.
                </i>
              </List.Item>
            </List>
            <BodyLong>
              For annen, utfyllende informasjon om søknaden bør du lenke direkte
              til søknadskapittelet i produktsiden, som{' '}
              <Link href="https://www.nav.no/dagpenger#sok">
                dette eksempelet for dagpenger
              </Link>
              .
            </BodyLong>
          </div>
          <div>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>
                  Informasjon vi henter om deg
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det så informasjon om hvor vi vil hente
                    opplysninger om søkeren og hva slags opplysninger vi henter.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  Hvordan vi behandler personopplysninger
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan vi behandler
                    personopplysningene til søkeren.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hva automatisk behandling
                    er, hva det betyr for søkeren og informasjon om søkerens
                    rettigheter ved automatisk avslag.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan denne søknaden
                    mellomlagrer informasjonen til søkeren og hvor lenge
                    informasjonen lagres. Vi skal informere om mellomlagring ved
                    både automatisk lagring og ved samtykke til lagring med
                    lagre-knapp.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <div>
            <BodyLong>
              Det er viktig at du gir oss riktige opplysninger slik at vi kan
              behandle saken din.{' '}
              <Link href="https://www.nav.no/endringer">
                Les mer om viktigheten av å gi riktige opplysninger.
              </Link>
            </BodyLong>
            <Box paddingBlock="4 8">
              <Checkbox>
                Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
              </Checkbox>
            </Box>
            <Button
              variant="primary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Start søknad
            </Button>
          </div>
        </VStack>
      </Page.Block>
    </Page>
  );
};

const ApplicationPictogram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    style={{ flexShrink: 0 }}
    aria-hidden
  >
    <rect x="23.25" y="22.5" width="26.25" height="9" fill="#CCE2F0" />
    <rect x="23.25" y="36.75" width="26.25" height="9" fill="#CCE2F0" />
    <circle cx="36.75" cy="34.5" r="21" fill="#CCE2F0" />
    <path
      d="M23.7672 5.508L30.1202 11.8434M1.5 33.75H34.5M26.4706 2.81211L10.5882 18.6506L9 26.5699L16.9412 24.986L32.8235 9.14751C34.5778 7.39804 34.5778 4.56158 32.8235 2.81211C31.0692 1.06263 28.2249 1.06263 26.4706 2.81211Z"
      stroke="#23262A"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 44.25L63.75 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 52.5L63.75 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 60.75L63.75 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 52.5L51 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 52.5L51 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 44.25L51 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 44.25L51 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 60.75L51 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 60.75L51 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="41.25"
      y="33"
      width="29.25"
      height="37.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
