import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes } from '../../../routing/Routes';

const OppsummeringOmDeg: React.FC = () => {
  const { søknad } = useSøknadContext();
  const history = useHistory();

  const omDeg = søknad.person.søker;
  const sivilstatus = søknad.sivilstatus;
  const medlemskap = søknad.medlemskap;

  const sivilstatusSpørsmål = VisLabelOgSvar(sivilstatus);

  const medlemskapSpørsmål = VisLabelOgSvar(medlemskap);
  // TODO: Håndter perioderBoddIUtlandet

  return (
    <Ekspanderbartpanel tittel="Om deg">
      <div className="spørsmål-og-svar">
        <Element>Fødselsnummer</Element>
        <Normaltekst>{omDeg.fnr}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Statsborgerskap</Element>
        <Normaltekst>{omDeg.statsborgerskap}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Adresse</Element>
        <Normaltekst>{omDeg.adresse.adresse}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Telefonnummer</Element>
        <Normaltekst>{omDeg.mobiltelefon}</Normaltekst>
      </div>
      {sivilstatusSpørsmål}
      {medlemskapSpørsmål}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: Routes[1].path,
            state: { edit: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringOmDeg;
