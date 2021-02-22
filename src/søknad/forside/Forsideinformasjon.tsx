import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { hentBeskjedMedNavn } from '../../utils/språk';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import React from 'react';
import { IPerson } from '../../models/søknad/person';
import { IntlShape } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../utils/søknad';
import { isIE } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Språkvelger from '../../components/språkvelger/Språkvelger';
import { useToggles } from '../../context/TogglesContext';
import { ToggleName } from '../../models/søknad/toggles';
import { useSpråkContext } from '../../context/SpråkContext';

const BlockContent = require('@sanity/block-content-to-react');

interface InnholdProps {
  seksjon?: any;
  disclaimer?: any;
  person: IPerson;
  intl: IntlShape;
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
  const history = useHistory();
  const [locale] = useSpråkContext();
  const { toggles } = useToggles();

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
      {toggles[ToggleName.vis_språkvelger] && (
        <FeltGruppe>
          <Språkvelger />
        </FeltGruppe>
      )}
      {locale == "en" && <AlertStripeAdvarsel>We are in the process of translating this application. The few missing translations will show up in Norwegian until we've translated them.</AlertStripeAdvarsel>}
      {seksjon &&
        seksjon.map((blokk: any, index: number) => {
          return blokk._type === 'dokumentasjonskrav' ? (
            <div className="seksjon" key={index}>
              <Ekspanderbartpanel tittel={blokk.tittel}>
                <BlockContent
                  className="typo-normal"
                  blocks={blokk.innhold}
                  serializers={{ types: { block: BlockRenderer } }}
                />
              </Ekspanderbartpanel>
            </div>
          ) : (
            <div className="seksjon" key={index}>
              {blokk.tittel && <Undertittel>{blokk.tittel}</Undertittel>}
              <div className={'typo-normal'}>
                <BlockContent
                  className="typo-normal"
                  blocks={blokk.innhold}
                  serializers={{ types: { block: BlockRenderer } }}
                />
              </div>
            </div>
          );
        })}

      {disclaimer && !isIE && (
        <div className="seksjon">
          <Undertittel className="disclaimer-tittel">
            {hentTekst('skjema.forside.disclaimer.tittel', intl)}
          </Undertittel>
          <AlertStripeAdvarsel>
            <BlockContent
              className="typo-normal"
              blocks={disclaimer}
              serializers={{ types: { block: BlockRenderer } }}
            />
            <BekreftCheckboksPanel
              onChange={(e) => settBekreftelse(!harBekreftet)}
              checked={!!harBekreftet}
              label={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'side.bekreftelse' })
              )}
            />
          </AlertStripeAdvarsel>
        </div>
      )}

      {harBekreftet ? (
        <FeltGruppe classname={'sentrert'} aria-live="polite">
          <KnappBase onClick={() => history.push(nesteSide)} type={'hoved'}>
            <LocaleTekst tekst={'knapp.start'} />
          </KnappBase>
        </FeltGruppe>
      ) : null}
    </>
  );
};

export default Forsideinformasjon;
