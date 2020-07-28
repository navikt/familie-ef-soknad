import React, { FC } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import {
  IMedlemskap,
  IUtenlandsopphold,
} from '../../../models/steg/omDeg/medlemskap';
import { ISivilstatus } from '../../../models/steg/omDeg/sivilstatus';
import { ISøker } from '../../../models/person';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

interface Props {
  søker: ISøker;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
}
const OppsummeringOmDeg: FC<Props> = ({ søker, sivilstatus, medlemskap }) => {
  const intl = useIntl();

  const history = useHistory();
  const omDeg = søker;
  const utenlandsopphold: IUtenlandsopphold[] | undefined =
    medlemskap.perioderBoddIUtlandet;

  const sivilstatusSpørsmål = VisLabelOgSvar(sivilstatus);
  const medlemskapSpørsmål = VisLabelOgSvar(medlemskap);

  const perioderUtland = visListeAvLabelOgSvar(
    utenlandsopphold,
    hentTekst('medlemskap.periodeBoddIUtlandet.utenlandsopphold', intl)
  );

  return (
    <Ekspanderbartpanel tittel={<Undertittel>Om deg</Undertittel>}>
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
