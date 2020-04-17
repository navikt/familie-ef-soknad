import React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';

const OppsummeringDinSituasjon: React.FC = () => {
  const { søknad } = useSøknad();
  const history = useHistory();

  const merOmDinSituasjon = søknad.merOmDinSituasjon;

  return (
    <Ekspanderbartpanel tittel="Mer om din situasjon">
      {VisLabelOgSvar(merOmDinSituasjon)}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.BosituasjonenDin),
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
