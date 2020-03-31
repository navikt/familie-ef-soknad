import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import { hentTekst } from '../../../utils/søknad';
import { useIntl, IntlShape } from 'react-intl';

const visListeAvLabelOgSvar = (liste: any[], overskrift: string) => {
  return liste.map((el, index) => {
    let tekst = overskrift;

    if (liste.length > 1) {
      tekst = tekst + ' ' + (index + 1);
    }

    return (
      <div className="listeelement">
        <Element>{tekst}</Element>
        {VisLabelOgSvar(el)}
        {index < liste.length - 1 && <hr />}
      </div>
    );
  });
};

const OppsummeringAktiviteter: React.FC = () => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  const aktivitet = søknad.aktivitet;

  const virksomhet = aktivitet.etablererEgenVirksomhet
    ? VisLabelOgSvar(aktivitet.etablererEgenVirksomhet)
    : null;

  const arbeidssituasjon = VisLabelOgSvar(aktivitet);

  const firma = aktivitet.firma ? VisLabelOgSvar(aktivitet.firma) : null;

  const arbeidsforhold = aktivitet.arbeidsforhold
    ? visListeAvLabelOgSvar(
        aktivitet.arbeidsforhold,
        hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl)
      )
    : null;

  const tidligereUtdanning = aktivitet.underUtdanning?.tidligereUtdanning
    ? visListeAvLabelOgSvar(
        aktivitet.underUtdanning.tidligereUtdanning,
        hentTekst('utdanning.undertittel', intl)
      )
    : null;

  const arbeidssøker = aktivitet.arbeidssøker
    ? VisLabelOgSvar(aktivitet.arbeidssøker)
    : null;

  const underUtdanning = aktivitet.underUtdanning
    ? VisLabelOgSvar(aktivitet.underUtdanning)
    : null;

  return (
    <Ekspanderbartpanel
      className="aktiviteter"
      tittel="Arbeid, utdanning og mindre aktiviteter"
    >
      {virksomhet ? <div className="seksjon">{virksomhet}</div> : null}
      {arbeidssituasjon ? (
        <div className="seksjon">{arbeidssituasjon}</div>
      ) : null}
      {arbeidsforhold ? <div className="seksjon">{arbeidsforhold}</div> : null}
      {firma ? <div className="seksjon">{firma}</div> : null}
      {arbeidssøker ? <div className="seksjon">{arbeidssøker}</div> : null}
      {underUtdanning ? (
        <div className="seksjon">
          {underUtdanning}
          {tidligereUtdanning}
        </div>
      ) : null}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
