import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';

const OppsummeringDinSituasjon: React.FC = () => {
  const { søknad } = useSøknadContext();

  const merOmDinSituasjon = søknad.merOmDinSituasjon;

  return (
    <Ekspanderbartpanel tittel="Mer om din situasjon">
      {VisLabelOgSvar(merOmDinSituasjon)}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDinSituasjon;
