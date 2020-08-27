import React from 'react';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { Ingress } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import {
  ESøkerDelerBolig,
  IBosituasjon,
} from '../../../models/steg/bosituasjon';
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

  const lagSamboerOverskrift = () => {
    if (bosituasjon.skalGifteSegEllerBliSamboer?.verdi) {
      return hentTekst(
        'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed',
        intl
      );
    } else if (
      bosituasjon.delerBoligMedAndreVoksne.svarid ===
      ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse
    ) {
      return hentTekst('bosituasjon.tittel.omTidligereSamboer', intl);
    } else if (
      bosituasjon.delerBoligMedAndreVoksne.svarid ===
      ESøkerDelerBolig.harEkteskapsliknendeForhold
    ) {
      return hentTekst('bosituasjon.tittel.omSamboer', intl);
    }
  };
  return (
    <Ekspanderbartpanel tittel={<Undertittel>Bosituasjonen din</Undertittel>}>
      <EkspanderbarOppsummering>
        {VisLabelOgSvar(bosituasjon)}
        {samboerDetaljer && (
          <div className="spørsmål-og-svar">
            <Ingress>{lagSamboerOverskrift()}</Ingress>
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
