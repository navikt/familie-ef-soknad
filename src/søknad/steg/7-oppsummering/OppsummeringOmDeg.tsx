import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useSøknad } from '../../../context/SøknadContext';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { IUtenlandsopphold } from '../../../models/steg/omDeg/medlemskap';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';

const OppsummeringOmDeg = () => {
  const { søknad } = useSøknad();
  const intl = useIntl();

  const history = useHistory();
  const omDeg = søknad.person.søker;
  const sivilstatus = søknad.sivilstatus;
  const medlemskap = søknad.medlemskap;
  const utenlandsopphold: IUtenlandsopphold[] | undefined =
    søknad.medlemskap.perioderBoddIUtlandet;

  const sivilstatusSpørsmål = VisLabelOgSvar(sivilstatus);
  const medlemskapSpørsmål = VisLabelOgSvar(medlemskap);

  const perioderUtland = visListeAvLabelOgSvar(
    utenlandsopphold,
    hentTekst('medlemskap.periodeBoddIUtlandet.utenlandsopphold', intl)
  );

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
        <Normaltekst>{omDeg.kontakttelefon}</Normaltekst>
      </div>
      {sivilstatusSpørsmål}
      {medlemskapSpørsmål}
      {perioderUtland}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.OmDeg),
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
