import { FC } from 'react';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { IBarn } from '../../../models/steg/barn';
import { VisLabelOgSvar } from '../../../utils/visning';
import BarneHeader from '../../../components/BarneHeader';
import { StyledOppsummeringForBarn } from '../../../components/stegKomponenter/StyledOppsummering';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  barn: IBarn[];
  endreInformasjonPath?: string;
}

const OppsummeringBarnasBosituasjon: FC<Props> = ({
  barn,
  endreInformasjonPath,
}) => {
  const navigate = useNavigate();
  const intl = useLokalIntlContext();

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
    <>
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
    </>
  );
};

export default OppsummeringBarnasBosituasjon;
