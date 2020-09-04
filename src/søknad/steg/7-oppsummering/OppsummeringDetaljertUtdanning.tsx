import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { IDetaljertUtdanning } from '../../../skolepenger/models/detaljertUtdanning';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {
  SeksjonSpacingTop,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';
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
  const history = useHistory();
  const intl = useIntl();

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
      tittel={<Undertittel>{tittel}</Undertittel>}
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
            history.replace({
              pathname: endreInformasjonPath,
              state: { kommerFraOppsummering: true },
            })
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </StyledOppsummeringMedUndertitler>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDetaljertUtdanning;
