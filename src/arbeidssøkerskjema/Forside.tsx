import React from 'react';
import Panel from 'nav-frontend-paneler';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { useSpråkContext } from '../context/SpråkContext';
import { hentBeskjedMedNavn } from '../utils/språk';
import { injectIntl } from 'react-intl';
import { hentTekst } from '../utils/søknad';
import { useHistory } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LocaleTekst from '../language/LocaleTekst';
import {
  ERouteArbeidssøkerskjema,
  RoutesArbeidssokerskjema,
} from './routes/routesArbeidssokerskjema';
import VeilederSnakkeboble from './VeilederSnakkeboble';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useSkjema } from './SkjemaContext';
import { useForsideInnhold } from '../utils/hooks';
import { ForsideType } from '../models/søknad/stønadstyper';
import { hentPath } from '../utils/routing';
import Språkvelger from '../components/språkvelger/Språkvelger';
import { ToggleName } from '../models/søknad/toggles';
import { useToggles } from '../context/TogglesContext';
import { logSidevisningArbeidssokerskjema } from '../utils/amplitude';
import { useMount } from '../utils/hooks';

const BlockContent = require('@sanity/block-content-to-react');

const Forside: React.FC<any> = ({ visningsnavn, intl }) => {
  const [locale] = useSpråkContext();
  const history = useHistory();
  const { toggles } = useToggles();

  const { skjema, settSkjema } = useSkjema();

  useMount(() => logSidevisningArbeidssokerskjema('Forside'));

  const settBekreftelse = (bekreftelse: boolean) => {
    settSkjema({
      ...skjema,
      harBekreftet: bekreftelse,
    });
  };
  const forside = useForsideInnhold(ForsideType.arbeidssøker);

  const onChange = () => {
    settBekreftelse(!skjema.harBekreftet);
  };

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

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>;
    }

    // Fall back to default handling
    return BlockContent.defaultSerializers.types.block(props);
  };

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
          {toggles[ToggleName.vis_språkvelger] && (
            <FeltGruppe>
              <Språkvelger />
            </FeltGruppe>
          )}
          <Sidetittel>
            <LocaleTekst tekst={'skjema.sidetittel'} />
          </Sidetittel>
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
                  {blokk.tittel && <Element>{blokk.tittel}</Element>}
                  <BlockContent
                    className="typo-normal"
                    blocks={blokk.innhold}
                    serializers={{ types: { block: BlockRenderer } }}
                  />
                </div>
              );
            })}

          {disclaimer && (
            <div className="seksjon">
              <Element className="disclaimer-tittel">
                {hentTekst('skjema.forside.disclaimer.tittel', intl)}
              </Element>
              <AlertStripeAdvarsel>
                <Normaltekst className="disclaimer-innhold">
                  {hentTekst('skjema.forside.disclaimer', intl)}
                </Normaltekst>
                <BekreftCheckboksPanel
                  onChange={(e) => onChange()}
                  checked={skjema.harBekreftet}
                  label={hentBeskjedMedNavn(
                    visningsnavn,
                    intl.formatMessage({ id: 'side.bekreftelse' })
                  )}
                />
              </AlertStripeAdvarsel>
            </div>
          )}

          {skjema.harBekreftet ? (
            <FeltGruppe classname={'sentrert'}>
              <KnappBase
                onClick={() =>
                  history.push({
                    pathname: hentPath(
                      RoutesArbeidssokerskjema,
                      ERouteArbeidssøkerskjema.Spørsmål
                    ),
                  })
                }
                type={'hoved'}
              >
                <LocaleTekst tekst={'skjema.knapp.start'} />
              </KnappBase>
            </FeltGruppe>
          ) : null}
        </Panel>
      </div>
    </div>
  );
};

export default injectIntl(Forside);
