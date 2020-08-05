import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IntlShape } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { hentTekst } from '../utils/søknad';
import { hentBeskjedMedNavn } from '../utils/språk';
import { hentPath, RouteEnum, Routes } from './routing/Routes';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import LocaleTekst from '../language/LocaleTekst';
import { useSkolepengerSøknad } from './SkolepengerContext';
import { IPerson } from '../models/person';

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
  const { søknad, settSøknad } = useSkolepengerSøknad();

  const settBekreftelse = (bekreftelse: boolean) => {
    settSøknad({
      ...søknad,
      harBekreftet: bekreftelse,
    });
  };
  const history = useHistory();

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
              {blokk.tittel && <Element>{blokk.tittel}</Element>}
              <div className="typo-normal">
                <BlockContent
                  className="typo-normal"
                  blocks={blokk.innhold}
                  serializers={{ types: { block: BlockRenderer } }}
                />
              </div>
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
            onClick={() =>
              history.push({ pathname: hentPath(Routes, RouteEnum.OmDeg) })
            }
            type={'hoved'}
          >
            <LocaleTekst tekst={'skjema.knapp.start'} />
          </KnappBase>
        </FeltGruppe>
      ) : null}
    </>
  );
};

export default Forsideinformasjon;
