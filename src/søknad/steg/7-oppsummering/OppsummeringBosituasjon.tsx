import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Element } from 'nav-frontend-typografi';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBosituasjon } from '../../../models/steg/bosituasjon';

interface Props {
  bosituasjon: IBosituasjon;
}
const OppsummeringBosituasionenDin: React.FC<Props> = ({ bosituasjon }) => {
  const history = useHistory();
  const intl = useIntl();

  const samboerDetaljer = bosituasjon.samboerDetaljer
    ? VisLabelOgSvar(bosituasjon.samboerDetaljer)
    : null;

  return (
    <Ekspanderbartpanel tittel={<Undertittel>Bosituasjonen din</Undertittel>}>
      <div className="oppsummering-bosituasjon">
        {VisLabelOgSvar(bosituasjon)}
        {samboerDetaljer && (
          <div className="seksjon-samboer">
            <Element>
              {hentTekst(
                'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed',
                intl
              )}
            </Element>
          </div>
        )}
        {samboerDetaljer}
        <LenkeMedIkon
          onClick={() =>
            history.push({
              pathname: hentPath(Routes, RouteEnum.BosituasjonenDin),
              state: { kommerFraOppsummering: true },
            })
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </div>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBosituasionenDin;
