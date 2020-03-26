import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
  visLabelOgSvar: Function;
}

const OppsummeringBarnaDine: React.FC<Props> = ({ visLabelOgSvar }) => {
  const { søknad } = useSøknadContext();

  const barna = søknad.person.barn;

  console.log('BARNA');
  console.log(barna);

  const felterAlleBarna = barna.map((barn, index) => {
    return (
      <div className="oppsummering-barn">
        {visLabelOgSvar(barn)}
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
