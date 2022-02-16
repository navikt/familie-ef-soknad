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
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {
  SeksjonSpacingTop,
  StyledOppsummering,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';
import LocaleTekst from '../../../language/LocaleTekst';
import { useNavigate } from 'react-router-dom';

interface Props {
  søker: ISøker;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  endreInformasjonPath?: string;
  tittel: string;
}
const OppsummeringOmDeg: FC<Props> = ({
  søker,
  sivilstatus,
  medlemskap,
  endreInformasjonPath,
  tittel,
}) => {
  const intl = useIntl();

  const navigate = useNavigate();
  const omDeg = søker;
  const utenlandsopphold: IUtenlandsopphold[] | undefined =
    medlemskap.perioderBoddIUtlandet;

  const datoFlyttetFraHverandre = VisLabelOgSvar(sivilstatus);
  const tidligereSamboer = VisLabelOgSvar(sivilstatus.tidligereSamboerDetaljer);
  const medlemskapSpørsmål = VisLabelOgSvar(medlemskap);

  const perioderUtland = visListeAvLabelOgSvar(
    utenlandsopphold,
    hentTekst('medlemskap.periodeBoddIUtlandet.utenlandsopphold', intl)
  );

  return (
    <Ekspanderbartpanel tittel={<Undertittel tag="h3">{tittel}</Undertittel>}>
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
            <Normaltekst>
              {omDeg.adresse.postnummer} {omDeg.adresse.poststed}
            </Normaltekst>
          </div>
          <div className="spørsmål-og-svar">
            <Element>
              <LocaleTekst tekst="person.telefonnr" />
            </Element>
            <Normaltekst>{omDeg.kontakttelefon}</Normaltekst>
          </div>
          {tidligereSamboer && (
            <div className="spørsmål-og-svar">
              <Ingress>
                {hentTekst('sivilstatus.tittel.samlivsbruddAndre', intl)}
              </Ingress>
              {tidligereSamboer}
            </div>
          )}
          {datoFlyttetFraHverandre}
          {medlemskapSpørsmål}
        </StyledOppsummering>

        <StyledOppsummeringMedUndertitler>
          <SeksjonSpacingTop>{perioderUtland}</SeksjonSpacingTop>
        </StyledOppsummeringMedUndertitler>
      </KomponentGruppe>
      <LenkeMedIkon
        onClick={() =>
          navigate(
            { pathname: endreInformasjonPath },
            { state: { kommerFraOppsummering: true } }
          )
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringOmDeg;
