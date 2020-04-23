import React, { useState, useEffect } from 'react';
import { Panel } from 'nav-frontend-paneler';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../context/PersonContext';
import { useSpråkContext } from '../context/SpråkContext';
import { Routes } from '../routing/Routes';
import { hentBeskjedMedNavn } from '../utils/språk';
import { injectIntl } from 'react-intl';
import { hentNesteRoute } from '../routing/utils';
import { useLocation, useHistory } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LocaleTekst from '../language/LocaleTekst';
import { client } from '../utils/sanity';
const BlockContent = require('@sanity/block-content-to-react');

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const location = useLocation();
  const [locale] = useSpråkContext();
  const history = useHistory();
  const nestePath = hentNesteRoute(Routes, location.pathname);
  const [forside, settForside] = useState<any>({});
  // eslint-disable-next-line
  const [error, settError] = useState<boolean>(false);
  // eslint-disable-next-line
  const [fetching, settFetching] = useState<boolean>(false);

  const [bekreftet, settBekreftet] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'forside' })
        .then((res: any) => {
          settForside(res);
        })
        .catch((err: any) => {
          settError(true);
        });
      settFetching(false);
    };
    fetchData();
  }, []);

  const onChange = () => {
    settBekreftet(!bekreftet);
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
          <Sidetittel>Søknad om NYTT SKJEMA</Sidetittel>

          {seksjon &&
            seksjon.map((blokk: any) => {
              return (
                <div className="seksjon">
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
              <AlertStripeAdvarsel>
                {' '}
                <BlockContent
                  className="typo-normal"
                  blocks={disclaimer}
                  serializers={{ types: { block: BlockRenderer } }}
                />
                <BekreftCheckboksPanel
                  onChange={(e) => onChange()}
                  checked={bekreftet ? true : false}
                  label={hentBeskjedMedNavn(
                    person.søker.forkortetNavn,
                    intl.formatMessage({ id: 'side.bekreftelse' })
                  )}
                />
              </AlertStripeAdvarsel>
            </div>
          )}

          {bekreftet ? (
            <FeltGruppe classname={'sentrert'}>
              <KnappBase
                onClick={() => history.push(nestePath.path)}
                type={'hoved'}
              >
                <LocaleTekst tekst={'knapp.start'} />
              </KnappBase>
            </FeltGruppe>
          ) : null}
        </Panel>
      </main>
    </div>
  );
};

export default injectIntl(Forside);
