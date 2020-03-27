import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';

const OppsummeringBosituasjon: React.FC = () => {
  const { søknad } = useSøknadContext();

  const barna = søknad.person.barn;
  const antallForeldre = barna.filter((barn) => barn.forelder).length;

  const felterAlleForeldrene = barna
    .filter((barn) => barn.forelder)
    .map((barn, index) => {
      if (!barn.forelder) return;
      const forelderFelter = VisLabelOgSvar(barn.forelder);

      return (
        <div className="oppsummering-barn">
          <Element>{barn.navn?.verdi}</Element>
          {forelderFelter}
          {index < antallForeldre - 1 && <hr />}
        </div>
      );
    });

  return (
    <Ekspanderbartpanel tittel="Bosituasjon">
      {felterAlleForeldrene}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBosituasjon;
