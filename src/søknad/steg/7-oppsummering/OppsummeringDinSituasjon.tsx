import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import { Undertittel } from 'nav-frontend-typografi';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { StyledOppsummering } from '../../../components/stegKomponenter/StyledOppsummering';
import { ITekstFelt } from '../../../models/søknad/søknadsfelter';

interface Props {
  dinSituasjon: IDinSituasjon;
  endreInformasjonPath?: string;
  barnMedsærligeTilsynsbehov: (ITekstFelt | undefined)[];
  tittel: string;
}

const OppsummeringDinSituasjon: React.FC<Props> = ({
  dinSituasjon,
  endreInformasjonPath,
  barnMedsærligeTilsynsbehov,
  tittel
}) => {
  const history = useHistory();

  const { gjelderDetteDeg, ...rest } = dinSituasjon;

  const barnMedsærligeTilsynsbehovlabelOgSvar = barnMedsærligeTilsynsbehov.reduce(
    (acc, val, idx) => {
      acc[`barnMedsærligeTilsynsbehov${idx}`] = val;
      return acc;
    },
    {} as any
  );

  return (
    <Ekspanderbartpanel
      tittel={<Undertittel tag="h3">{tittel}</Undertittel>}
    >
      <StyledOppsummering>
        <KomponentGruppe>
          {VisLabelOgSvar({
            gjelderDetteDeg,
            ...barnMedsærligeTilsynsbehovlabelOgSvar,
            ...rest,
          })}
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
      </StyledOppsummering>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringDinSituasjon;
