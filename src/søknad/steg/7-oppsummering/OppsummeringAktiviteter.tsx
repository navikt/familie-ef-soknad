import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';

const OppsummeringAktiviteter: React.FC = () => {
  const { søknad } = useSøknadContext();

  const aktivitet = søknad.aktivitet;

  const arbeidssituasjon = VisLabelOgSvar(aktivitet);

  const firma = aktivitet.firma ? VisLabelOgSvar(aktivitet.firma) : null;

  return (
    <Ekspanderbartpanel tittel="Arbeid, utdanning og mindre aktiviteter">
      {arbeidssituasjon}
      {firma}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
