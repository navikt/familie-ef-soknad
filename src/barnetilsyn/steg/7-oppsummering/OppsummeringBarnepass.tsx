import React, { FC } from 'react';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import LocaleTekst from '../../../language/LocaleTekst';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBarn } from '../../../models/barn';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { hentPath, RouteEnum, Routes } from '../../routing/Routes';

interface Props {
  barnSomSkalHaBarnepass: IBarn[];
}

const OppsummeringBarnepass: FC<Props> = ({ barnSomSkalHaBarnepass }) => {
  const history = useHistory();
  const intl = useIntl();

  const visLabelOgSvarForBarn = (barn: IBarn) => {};

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel>
          <LocaleTekst tekst={'barnepass.sidetittel'} />
        </Undertittel>
      }
    >
      <EkspanderbarOppsummering>
        {barnSomSkalHaBarnepass.map((barn: IBarn) =>
          visLabelOgSvarForBarn(barn)
        )}

        <LenkeMedIkon
          onClick={() =>
            history.push({
              pathname: hentPath(Routes, RouteEnum.Barnepass),
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

export default OppsummeringBarnepass;
