import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes } from '../../../routing/Routes';

const OppsummeringDinSituasjon: React.FC = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

  const merOmDinSituasjon = søknad.merOmDinSituasjon;

  return (
    <Ekspanderbartpanel tittel="Mer om din situasjon">
      {VisLabelOgSvar(merOmDinSituasjon)}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: '/barn',
            state: { edit: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: Routes[6].path,
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDinSituasjon;
