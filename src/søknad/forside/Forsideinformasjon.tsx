import { hentBeskjedMedNavn } from '../../utils/språk';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import React from 'react';
import { IPerson } from '../../models/søknad/person';
import { hentTekst } from '../../utils/søknad';
import { isIE } from 'react-device-detect';
import Språkvelger from '../../components/språkvelger/Språkvelger';
import { useSpråkContext } from '../../context/SpråkContext';
import { useNavigate } from 'react-router-dom';
import { LokalIntlShape } from '../../language/typer';
import {
  Alert,
  Heading,
  Button,
  ConfirmationPanel,
  Accordion,
} from '@navikt/ds-react';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';
import { PortableTextReactComponents } from '@portabletext/react/src/types';

const StyledConfirmationPanel = styled(ConfirmationPanel)`
  margin-bottom: 2rem;
`;

const DisclaimerTittel = styled(Heading)`
  margin-bottom: 1rem;
`;

interface InnholdProps {
  seksjon?: any;
  disclaimer?: any;
  person: IPerson;
  intl: LokalIntlShape;
  harBekreftet: boolean;
  settBekreftelse: (bekreftet: boolean) => void;
  nesteSide: string;
}

const components: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => {
      return (
        <span className="lenke-tekst">
          <a href={value}>{children}</a>
        </span>
      );
    },
  },
};

const Forsideinformasjon: React.FC<InnholdProps> = ({
  seksjon,
  disclaimer,
  person,
  intl,
  harBekreftet,
  settBekreftelse,
  nesteSide,
}) => {
  const navigate = useNavigate();
  const [locale] = useSpråkContext();

  return (
    <>
      <FeltGruppe>
        <Språkvelger />
      </FeltGruppe>
      {locale === 'en' && (
        <Alert size="small" variant="warning">
          We are in the process of translating this application. The few missing
          translations will appear in Norwegian until we've translated them.
        </Alert>
      )}
      {seksjon &&
        seksjon.map((blokk: any, index: number) => {
          return blokk._type === 'dokumentasjonskrav' ? (
            <div className="seksjon" key={index}>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>{blokk.tittel}</Accordion.Header>
                  <Accordion.Content>
                    <div className={'navds-body-short navds-body-long'}>
                      <PortableText
                        value={blokk.innhold}
                        components={components}
                      />
                    </div>
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
              <div className={'navds-body-short navds-body-long'}>
                <PortableText value={blokk.innhold} components={components} />
              </div>
            </div>
          );
        })}
      {disclaimer && !isIE && (
        <>
          <DisclaimerTittel level="2" size="small">
            {hentTekst('skjema.forside.disclaimer.tittel', intl)}
          </DisclaimerTittel>
          <StyledConfirmationPanel
            checked={!!harBekreftet}
            label={hentBeskjedMedNavn(
              person.søker.forkortetNavn,
              intl.formatMessage({ id: 'side.bekreftelse' })
            )}
            onChange={() => settBekreftelse(!harBekreftet)}
          >
            <div className={'navds-body-short navds-body-long'}>
              <PortableText value={disclaimer} components={components} />
            </div>
          </StyledConfirmationPanel>
        </>
      )}

      {harBekreftet ? (
        <FeltGruppe classname={'sentrert'} aria-live="polite">
          <Button onClick={() => navigate(nesteSide)} variant="primary">
            <LocaleTekst tekst={'knapp.start'} />
          </Button>
        </FeltGruppe>
      ) : null}
    </>
  );
};

export default Forsideinformasjon;
