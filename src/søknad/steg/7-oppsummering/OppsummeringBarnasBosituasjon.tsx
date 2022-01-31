import React, { FC } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { IBarn } from '../../../models/steg/barn';
import { Undertittel } from 'nav-frontend-typografi';
import { VisLabelOgSvar } from '../../../utils/visning';
import BarneHeader from '../../../components/BarneHeader';
import { StyledOppsummeringForBarn } from '../../../components/stegKomponenter/StyledOppsummering';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface Props {
  barn: IBarn[];
  endreInformasjonPath?: string;
  tittel: string;
}
const OppsummeringBarnasBosituasjon: FC<Props> = ({
  barn,
  endreInformasjonPath,
  tittel,
}) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const felterAlleForeldrene = barn
    .filter((barn) => barn.forelder)
    .map((barn) => {
      if (!barn.forelder) return null;

      let nyForelder = {
        ...barn.forelder,
        navn: {
          label: hentTekst('barnasbosted.oppsummering.navn.label', intl),
          verdi: barn.forelder?.navn?.verdi,
        },
      };

      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;

      const barnetsNavn =
        barn.født?.verdi && barn.navn.verdi
          ? barn.navn.verdi
          : hentTekst('barnet.litenForBokstav', intl);

      const forelderFelter = VisLabelOgSvar(nyForelder, barnetsNavn);

      return (
        <StyledOppsummeringForBarn key={barn.id}>
          <BarneHeader barn={barn} />
          {forelderFelter}
        </StyledOppsummeringForBarn>
      );
    });

  return (
    <Ekspanderbartpanel tittel={<Undertittel tag="h3">{tittel}</Undertittel>}>
      <KomponentGruppe>{felterAlleForeldrene}</KomponentGruppe>
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

export default OppsummeringBarnasBosituasjon;
