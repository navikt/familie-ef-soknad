import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { hentBeskjedMedNavn } from '../../utils/språk';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import React from 'react';
import { IPerson } from '../../models/person';
import { IntlShape } from 'react-intl';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { useHistory, useLocation } from 'react-router-dom';
import { hentNesteRoute } from '../../routing/utils';
import { Routes } from '../../routing/Routes';
import { useSøknad } from '../../context/SøknadContext';
import { hentTekst } from '../../utils/søknad';
const BlockContent = require('@sanity/block-content-to-react');

interface InnholdProps {
  seksjon?: any;
  disclaimer?: any;
  person: IPerson;
  intl: IntlShape;
}

const Forsideinformasjon: React.FC<InnholdProps> = ({
  seksjon,
  disclaimer,
  person,
  intl,
}) => {
  const { søknad, settSøknad } = useSøknad();

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };
  const history = useHistory();
  const location = useLocation();
  const nestePath = hentNesteRoute(Routes, location.pathname);

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
    <>
      {seksjon &&
        seksjon.map((blokk: any, index: number) => {
          return (
            <div className="seksjon" key={index}>
              {blokk.tittel && <Undertittel>{blokk.tittel}</Undertittel>}
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
              onChange={(e) => settBekreftelse(!søknad.harBekreftet)}
              checked={!!søknad.harBekreftet}
              label={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'side.bekreftelse' })
              )}
            />
          </AlertStripeAdvarsel>
        </div>
      )}

      {søknad.harBekreftet ? (
        <FeltGruppe classname={'sentrert'}>
          <KnappBase
            onClick={() => history.push(nestePath.path)}
            type={'hoved'}
          >
            <LocaleTekst tekst={'knapp.start'} />
          </KnappBase>
        </FeltGruppe>
      ) : null}
    </>
  );
};

export default Forsideinformasjon;
