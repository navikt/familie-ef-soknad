import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
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

const BlockContent = require('@sanity/block-content-to-react');

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const [locale] = useSpråkContext();
  const history = useHistory();
  const { skjema, settSkjema } = useSkjema();

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
      <main className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <div className="veileder">
            <VeilederSnakkeboble
              tekst={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'skjema.hei' })
              )}
            />
          </div>
          <Sidetittel>Enslig mor eller far som arbeidssøker</Sidetittel>
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
                    person.søker.forkortetNavn,
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
      </main>
    </div>
  );
};

export default injectIntl(Forside);
