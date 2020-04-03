import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes } from '../../../routing/Routes';

const OppsummeringBosituasjon: React.FC = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

  const barna = søknad.person.barn;
  const antallForeldre = barna.filter((barn) => barn.forelder).length;

  const felterAlleForeldrene = barna
    .filter((barn) => barn.forelder)
    .map((barn, index) => {
      if (!barn.forelder) return null;
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
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: Routes[4].path,
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBosituasjon;
