import React from 'react';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Element } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { VisLabelOgSvar } from '../../../utils/visning';

interface Props {
  bosituasjon: IBosituasjon;
  endreInformasjonPath?: string;
}
const OppsummeringBosituasionenDin: React.FC<Props> = ({
  bosituasjon,
  endreInformasjonPath,
}) => {
  const history = useHistory();
  const intl = useIntl();

  const samboerDetaljer = bosituasjon.samboerDetaljer
    ? VisLabelOgSvar(bosituasjon.samboerDetaljer)
    : null;

  return (
    <Ekspanderbartpanel tittel={<Undertittel>Bosituasjonen din</Undertittel>}>
      <EkspanderbarOppsummering>
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

export default OppsummeringBosituasionenDin;
