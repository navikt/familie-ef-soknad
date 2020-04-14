import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';

const OppsummeringBarnaDine: React.FC = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

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
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.Barn),
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnaDine;
