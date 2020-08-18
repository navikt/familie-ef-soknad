import React, { FC } from 'react';
import { Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import { Undertittel } from 'nav-frontend-typografi';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { IBarn } from '../../../models/steg/barn';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';

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
  const antallForeldre = barna.filter((barn) => barn.forelder).length;

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
        <div className="oppsummering-barn" key={index}>
          <Element>{barn.navn?.verdi}</Element>
          {forelderFelter}
          {index < antallForeldre - 1 && <hr />}
        </div>
      );
    });

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel>{hentTekst('barnasbosted.sidetittel', intl)}</Undertittel>
      }
    >
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
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnasBosituasjon;
