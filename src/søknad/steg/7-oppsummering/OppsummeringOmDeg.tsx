import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useSøknad } from '../../../context/SøknadContext';
import {
  VisLabelOgSvar,
  VisPerioderBoddIUtlandet,
} from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { IUtenlandsopphold } from '../../../models/steg/omDeg/medlemskap';

const OppsummeringOmDeg = () => {
  const { søknad } = useSøknad();

  const history = useHistory();
  const omDeg = søknad.person.søker;
  const sivilstatus = søknad.sivilstatus;
  const medlemskap = søknad.medlemskap;
  const utlandet: IUtenlandsopphold[] | undefined =
    søknad.medlemskap.perioderBoddIUtlandet;

  const perioderBoddIUtlandet = utlandet
    ? VisPerioderBoddIUtlandet(utlandet)
    : null;

  const sivilstatusSpørsmål = VisLabelOgSvar(sivilstatus);
  const medlemskapSpørsmål = VisLabelOgSvar(medlemskap);

  console.log('omDeg', omDeg);

  return (
    <Ekspanderbartpanel tittel="Om deg">
      <div className="spørsmål-og-svar">
        <Element>Fødselsnummer eller d-nummer</Element>
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
      {perioderBoddIUtlandet}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.Oppsummering),
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringOmDeg;
