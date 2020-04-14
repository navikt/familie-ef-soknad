import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';

const OppsummeringBosituasionenDin: React.FC = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

  const bosituasjon = søknad.bosituasjon;

  const samboerDetaljer = bosituasjon.samboerDetaljer
    ? VisLabelOgSvar(bosituasjon.samboerDetaljer)
    : null;

  return (
    <Ekspanderbartpanel tittel="Bosituasjonen din">
      {VisLabelOgSvar(bosituasjon)}
      {samboerDetaljer}
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

export default OppsummeringBosituasionenDin;
