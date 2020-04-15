import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';

const OppsummeringBarnasBosituasjon = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

  const barna = søknad.person.barn;
  const antallForeldre = barna.filter((barn) => barn.forelder).length;

  const { samboerDetaljer, ...bosituasjon } = søknad.bosituasjon;
  const bosituasjonSpørsmål = VisLabelOgSvar(bosituasjon);

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
    <Ekspanderbartpanel tittel="Barnas bosted">
      {felterAlleForeldrene}
      {bosituasjonSpørsmål}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.BarnasBosted),
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnasBosituasjon;
