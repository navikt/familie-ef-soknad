import React, { useState, useEffect } from 'react';
import { Panel } from 'nav-frontend-paneler';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import Språkvelger from '../../components/språkvelger/Språkvelger';
import { ReactComponent as Veilederkvinne } from '../../assets/VeilederKvinne.svg';
import Veileder from 'nav-frontend-veileder';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../../context/PersonContext';
import { Routes } from '../../routing/Routes';
import useSøknadContext from '../../context/SøknadContext';
import { hentBeskjedMedNavn } from '../../utils/språk';
import { FormattedHTMLMessage, injectIntl } from 'react-intl';
import { hentNesteRoute } from '../../routing/utils';
import { useLocation, useHistory } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../language/LocaleTekst';
import { client } from '../../utils/sanity';

const BlockContent = require('@sanity/block-content-to-react');

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const location = useLocation();
  const history = useHistory();
  const nestePath = hentNesteRoute(Routes, location.pathname);
  const [forside, settForside] = useState<any>({});
  const [error, settError] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(false);

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
    settSøknad({ ...søknad, bekreftet: !søknad.bekreftet });
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

  return (
    <div className={'forside'}>
      <main className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <Sidetittel>Søknad om overgangsstønad</Sidetittel>

          {forside.seksjon &&
            forside.seksjon.map((seksjon: any) => {
              return (
                <div className="seksjon">
                  {seksjon.tittel && <Element>{seksjon.tittel}</Element>}
                  <BlockContent
                    className="typo-normal"
                    blocks={seksjon.innhold}
                    serializers={{ types: { block: BlockRenderer } }}
                  />
                </div>
              );
            })}

          {forside.disclaimer && (
            <div className="seksjon">
              <AlertStripeAdvarsel>
                {' '}
                <BlockContent
                  className="typo-normal"
                  blocks={forside.disclaimer}
                  serializers={{ types: { block: BlockRenderer } }}
                />
                <BekreftCheckboksPanel
                  onChange={(e) => onChange()}
                  checked={søknad.bekreftet ? true : false}
                  label={hentBeskjedMedNavn(
                    person.søker.forkortetNavn,
                    intl.formatMessage({ id: 'side.bekreftelse' })
                  )}
                />
              </AlertStripeAdvarsel>
            </div>
          )}

          {søknad.bekreftet ? (
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
