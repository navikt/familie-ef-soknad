import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useSøknad } from '../../../context/SøknadContext';

interface Props {
  visLabelOgSvar: Function;
}

const OppsummeringOmDeg: React.FC<Props> = ({ visLabelOgSvar }) => {
  const { søknad } = useSøknad();

  const omDeg = søknad.person.søker;
  const sivilstatus = søknad.sivilstatus;
  const medlemskap = søknad.medlemskap;

  const sivilstatusSpørsmål = visLabelOgSvar(sivilstatus);

  const medlemskapSpørsmål = visLabelOgSvar(medlemskap);
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
    </Ekspanderbartpanel>
  );
};

export default OppsummeringOmDeg;
