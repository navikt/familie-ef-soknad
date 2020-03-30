import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import { hentTekst } from '../../../utils/søknad';
import { useIntl, IntlShape } from 'react-intl';

const VisArbeidsforhold = (arbeidsforhold: any[], intl: IntlShape) => {
  return arbeidsforhold.map((arbeid, index) => {
    let tekst = hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl);

    if (arbeidsforhold.length > 1) {
      tekst = tekst + ' ' + (index + 1);
    }

    return (
      <div className="arbeidsforhold">
        <Element>{tekst}</Element>
        {VisLabelOgSvar(arbeid)}
        {index < arbeidsforhold.length - 1 && <hr />}
      </div>
    );
  });
};

const OppsummeringAktiviteter: React.FC = () => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  const aktivitet = søknad.aktivitet;

  const arbeidssituasjon = VisLabelOgSvar(aktivitet);

  const firma = aktivitet.firma ? VisLabelOgSvar(aktivitet.firma) : null;

  const arbeidsforhold = aktivitet.arbeidsforhold
    ? VisArbeidsforhold(aktivitet.arbeidsforhold, intl)
    : null;

  return (
    <Ekspanderbartpanel
      className="aktiviteter"
      tittel="Arbeid, utdanning og mindre aktiviteter"
    >
      {arbeidssituasjon}
      {arbeidsforhold}
      {firma}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
