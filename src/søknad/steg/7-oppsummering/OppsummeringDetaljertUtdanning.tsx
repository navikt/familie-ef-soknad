import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { IDetaljertUtdanning } from '../../../skolepenger/models/detaljertUtdanning';
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
      <div className="seksjon">
        {underUtdanning}
        {tidligereUtdanning}
      </div>
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
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDetaljertUtdanning;
