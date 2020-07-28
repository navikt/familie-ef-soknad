import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import { Undertittel } from 'nav-frontend-typografi';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';

interface Props {
  dinSituasjon: IDinSituasjon;
}

const OppsummeringDinSituasjon: React.FC<Props> = ({ dinSituasjon }) => {
  const history = useHistory();

  const merOmDinSituasjon = dinSituasjon;

  return (
    <Ekspanderbartpanel
      tittel={<Undertittel>Mer om din situasjon</Undertittel>}
    >
      {VisLabelOgSvar(merOmDinSituasjon)}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.DinSituasjon),
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
