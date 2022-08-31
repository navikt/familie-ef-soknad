import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { IDetaljertUtdanning } from '../../../skolepenger/models/detaljertUtdanning';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {
  SeksjonSpacingTop,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';
import { useNavigate } from 'react-router-dom';
import { Heading, Ingress } from '@navikt/ds-react';
interface Props {
  utdanning: IDetaljertUtdanning;
  endreInformasjonPath?: string;
  tittel: string;
}

const OppsummeringDetaljertUtdanning: React.FC<Props> = ({
  utdanning,
  endreInformasjonPath,
  tittel,
}) => {
  const navigate = useNavigate();
  const intl = useLokalIntlContext();

  const tidligereUtdanning = utdanning?.tidligereUtdanning
    ? visListeAvLabelOgSvar(
        utdanning.tidligereUtdanning,
        hentTekst('utdanning.tittel.tidligere', intl)
      )
    : null;

  const underUtdanning = VisLabelOgSvar(utdanning);

  return (
    <Ekspanderbartpanel
      className="aktiviteter"
      tittel={
        <Heading size="small" level="3">
          {tittel}
        </Heading>
      }
    >
      <StyledOppsummeringMedUndertitler>
        <KomponentGruppe>
          <SeksjonSpacingTop>
            <Ingress>{hentTekst('utdanning.tittel', intl)}</Ingress>
            {underUtdanning}
          </SeksjonSpacingTop>
          <SeksjonSpacingTop>{tidligereUtdanning}</SeksjonSpacingTop>
        </KomponentGruppe>
        <LenkeMedIkon
          onClick={() =>
            navigate(
              {
                pathname: endreInformasjonPath,
              },
              { state: { kommerFraOppsummering: true }, replace: true }
            )
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </StyledOppsummeringMedUndertitler>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDetaljertUtdanning;
