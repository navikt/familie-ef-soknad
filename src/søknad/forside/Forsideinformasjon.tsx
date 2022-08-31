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

const StyledConfirmationPanel = styled(ConfirmationPanel)`
  margin-bottom: 2rem;
`;

const DisclaimerTittel = styled(Heading)`
  margin-bottom: 1rem;
`;

const BlockContent = require('@sanity/block-content-to-react');

interface InnholdProps {
  seksjon?: any;
  disclaimer?: any;
  person: IPerson;
  intl: LokalIntlShape;
  harBekreftet: boolean;
  settBekreftelse: (bekreftet: boolean) => void;
  nesteSide: string;
}

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

  const BlockRenderer = (props: any) => {
    const { style = 'normal' } = props.node;

    if (/^h\d/.test(style)) {
      const level = style.replace(/[^\d]/g, '');
      return React.createElement(
        style,
        { className: `heading-${level}` },
        props.children
      );
    }

    if (props.node.markDefs.length > 0) {
      return props.node.markDefs.map((mark: any, index: number) => {
        let { _type = '' } = mark;
        if (_type === 'link') {
          return (
            <span className="lenke-tekst" key={index}>
              {props.children}
            </span>
          );
        }
        return props.children;
      });
    }

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>;
    }

    // Fall back to default handling
    return BlockContent.defaultSerializers.types.block(props);
  };

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
                    <BlockContent
                      className="navds-body-short navds-body-long"
                      blocks={blokk.innhold}
                      serializers={{ types: { block: BlockRenderer } }}
                    />
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
                <BlockContent
                  className="navds-body-short navds-body-long"
                  blocks={blokk.innhold}
                  serializers={{ types: { block: BlockRenderer } }}
                />
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
            <BlockContent
              blocks={disclaimer}
              serializers={{ types: { block: BlockRenderer } }}
            />
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
