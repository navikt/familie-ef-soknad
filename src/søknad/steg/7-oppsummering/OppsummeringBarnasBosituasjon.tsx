import React, { FC } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { IBarn } from '../../../models/steg/barn';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { VisLabelOgSvar } from '../../../utils/visning';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import BarneHeader from '../../../components/BarneHeader';
import styled from 'styled-components';

const StyledOppsummering = styled.section`
  &:first-child {
    margin-top: 3rem;
  }
  padding-bottom: 60px;

  .typo-element {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

interface Props {
  barn: IBarn[];
  endreInformasjonPath?: string;
}
const OppsummeringBarnasBosituasjon: FC<Props> = ({
  barn,
  endreInformasjonPath,
}) => {
  const history = useHistory();
  const intl = useIntl();
  const barna = barn;

  const felterAlleForeldrene = barna
    .filter((barn) => barn.forelder)
    .map((barn, index) => {
      if (!barn.forelder) return null;

      let nyForelder = { ...barn.forelder };

      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;

      const barnetsNavn =
        barn.født?.verdi && barn.navn.verdi ? barn.navn.verdi : 'barnet';

      const forelderFelter = VisLabelOgSvar(nyForelder, barnetsNavn);

      return (
        <StyledOppsummering>
          <BarneHeader barn={barn} />
          {forelderFelter}
        </StyledOppsummering>
      );
    });

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel>{hentTekst('barnasbosted.sidetittel', intl)}</Undertittel>
      }
    >
      <EkspanderbarOppsummering>
        {felterAlleForeldrene}
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
      </EkspanderbarOppsummering>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnasBosituasjon;
