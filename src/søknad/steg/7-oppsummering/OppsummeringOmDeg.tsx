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
import { ISøker } from '../../../models/søknad/person';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {
  SeksjonSpacingTop,
  StyledOppsummering,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
  søker: ISøker;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  endreInformasjonPath?: string;
}
const OppsummeringOmDeg: FC<Props> = ({
  søker,
  sivilstatus,
  medlemskap,
  endreInformasjonPath,
}) => {
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
    <Ekspanderbartpanel
      tittel={
        <Undertittel>
          <LocaleTekst tekst="stegtittel.omDeg" />
        </Undertittel>
      }
    >
      <KomponentGruppe>
        <StyledOppsummering>
          <div className="spørsmål-og-svar">
            <Element>
              <LocaleTekst tekst="person.ident" />
            </Element>
            <Normaltekst>{omDeg.fnr}</Normaltekst>
          </div>
          <div className="spørsmål-og-svar">
            <Element>
              <LocaleTekst tekst="person.statsborgerskap" />
            </Element>
            <Normaltekst>{omDeg.statsborgerskap}</Normaltekst>
          </div>
          <div className="spørsmål-og-svar">
            <Element>
              <LocaleTekst tekst="person.adresse" />
            </Element>
            <Normaltekst>{omDeg.adresse.adresse}</Normaltekst>
          </div>
          <div className="spørsmål-og-svar">
            <Element>
              <LocaleTekst tekst="person.telefonnr" />
            </Element>
            <Normaltekst>{omDeg.kontakttelefon}</Normaltekst>
          </div>
          {sivilstatusSpørsmål}
          {medlemskapSpørsmål}
        </StyledOppsummering>

        <StyledOppsummeringMedUndertitler>
          <SeksjonSpacingTop>{perioderUtland}</SeksjonSpacingTop>
        </StyledOppsummeringMedUndertitler>
      </KomponentGruppe>
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: endreInformasjonPath,
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
