import React, { FC } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { IBarn } from '../../../models/steg/barn';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { VisLabelOgSvar } from '../../../utils/visning';
import BarneHeader from '../../../components/BarneHeader';
import { StyledOppsummeringForBarn } from '../../../components/stegKomponenter/StyledOppsummering';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

interface Props {
  barn: IBarn[];
  endreInformasjonPath?: string;
  tittel: string;
}
const OppsummeringBarnasBosituasjon: FC<Props> = ({
  barn,
  endreInformasjonPath,
  tittel
}) => {
  const history = useHistory();

  const felterAlleForeldrene = barn
    .filter((barn) => barn.forelder)
    .map((barn) => {
      if (!barn.forelder) return null;

      let nyForelder = { ...barn.forelder };

      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;

      const barnetsNavn =
        barn.født?.verdi && barn.navn.verdi
          ? barn.navn.verdi
          : 'barnet.storForBokstav';

      const forelderFelter = VisLabelOgSvar(nyForelder, barnetsNavn);

      return (
        <StyledOppsummeringForBarn key={barn.id}>
          <BarneHeader barn={barn} />
          {forelderFelter}
        </StyledOppsummeringForBarn>
      );
    });

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel tag="h3">
          {tittel}
        </Undertittel>
      }
    >
      <KomponentGruppe>{felterAlleForeldrene}</KomponentGruppe>
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

export default OppsummeringBarnasBosituasjon;
