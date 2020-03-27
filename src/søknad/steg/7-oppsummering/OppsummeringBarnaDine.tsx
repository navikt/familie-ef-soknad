import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
  VisLabelOgSvar: Function;
}

const OppsummeringBarnaDine: React.FC<Props> = ({ VisLabelOgSvar }) => {
  const { søknad } = useSøknadContext();

  const barna = søknad.person.barn;

  const felterAlleBarna = barna.map((barn, index) => {
    return (
      <div className="oppsummering-barn">
        {VisLabelOgSvar(barn)}
        {index < barna.length - 1 && <hr />}
      </div>
    );
  });

  return (
    <Ekspanderbartpanel tittel="Barna dine">
      {felterAlleBarna}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnaDine;
