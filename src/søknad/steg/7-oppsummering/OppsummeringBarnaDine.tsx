import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
  visLabelOgSvar: Function;
}

const OppsummeringBarnaDine: React.FC<Props> = ({ visLabelOgSvar }) => {
  const { søknad } = useSøknadContext();

  return (
    <Ekspanderbartpanel tittel="Barna dine">
      <h1>Halla</h1>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnaDine;
