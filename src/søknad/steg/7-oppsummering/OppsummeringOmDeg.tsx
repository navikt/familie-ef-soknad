import { FC } from 'react';
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
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {
  SeksjonSpacingTop,
  StyledOppsummering,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';
import LocaleTekst from '../../../language/LocaleTekst';
import { useNavigate } from 'react-router-dom';
import { BodyShort, Heading, Ingress, Label } from '@navikt/ds-react';

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
  const intl = useLokalIntlContext();

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
    <Ekspanderbartpanel
      tittel={
        <Heading size="small" level="3">
          {tittel}
        </Heading>
      }
    >
      <KomponentGruppe>
        <StyledOppsummering>
          <div className="spørsmål-og-svar">
            <Label>
              <LocaleTekst tekst="person.ident" />
            </Label>
            <BodyShort>{omDeg.fnr}</BodyShort>
          </div>
          <div className="spørsmål-og-svar">
            <Label>
              <LocaleTekst tekst="person.statsborgerskap" />
            </Label>
            <BodyShort>{omDeg.statsborgerskap}</BodyShort>
          </div>
          <div className="spørsmål-og-svar">
            <Label>
              <LocaleTekst tekst="person.adresse" />
            </Label>
            <BodyShort>{omDeg.adresse.adresse}</BodyShort>
            <BodyShort>
              {omDeg.adresse.postnummer} {omDeg.adresse.poststed}
            </BodyShort>
          </div>
          <div className="spørsmål-og-svar">
            <Label>
              <LocaleTekst tekst="person.telefonnr" />
            </Label>
            <BodyShort>{omDeg.kontakttelefon}</BodyShort>
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
