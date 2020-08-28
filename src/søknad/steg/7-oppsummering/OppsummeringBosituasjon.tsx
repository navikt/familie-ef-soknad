import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Ingress } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { VisLabelOgSvar } from '../../../utils/visning';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { StyledOppsummering } from '../../../components/stegKomponenter/StyledOppsummering';

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
      <StyledOppsummering>
        <KomponentGruppe>{VisLabelOgSvar(bosituasjon)}</KomponentGruppe>
        {samboerDetaljer && (
          <KomponentGruppe>
            <Ingress>
              {hentTekst(
                'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed',
                intl
              )}
            </Ingress>
            {samboerDetaljer}
          </KomponentGruppe>
        )}
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

export default OppsummeringBosituasionenDin;
