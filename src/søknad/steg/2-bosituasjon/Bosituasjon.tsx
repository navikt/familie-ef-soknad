import React, { FC } from 'react';
import { IRoute, Routes } from '../../../config/Routes';

import { FormattedHTMLMessage, injectIntl, IntlShape } from 'react-intl';
import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../utils/routing';
import { erValgtSvarLiktSomSvar } from '../../../utils/søknad';
import SeksjonGruppe from '../../../components/SeksjonGruppe';
import KomponentGruppe from '../../../components/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import {
  delerSøkerBoligMedAndreVoksne,
  skalSøkerGifteSegMedSamboer,
} from '../../../config/BosituasjonConfig';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import useSøknadContext from '../../../context/SøknadContext';
import { IMultiSpørsmål } from '../../../models/spørsmal';
import OmSamboerenDin from './OmSamboerenDin';

interface Props {
  intl: IntlShape;
}

const Bosituasjon: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;

  const hovedSpørsmål: IMultiSpørsmål = delerSøkerBoligMedAndreVoksne;
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const valgtBosituasjon: string = bosituasjon.søkerDelerBoligMedAndreVoksne
    .svar_tekst
    ? bosituasjon.søkerDelerBoligMedAndreVoksne.svar_tekst
    : '';

  const settBosituasjon = (svar: string) => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerDelerBoligMedAndreVoksne: {
          nøkkel: delerSøkerBoligMedAndreVoksne.spørsmål_id,
          spørsmål_tekst: intl.formatMessage({
            id: delerSøkerBoligMedAndreVoksne.tekstid,
          }),
          svar_tekst: svar,
        },
      },
    });
  };

  const valgtSvarsalternativ = hovedSpørsmål.svaralternativer.find(
    (svar) =>
      svar.alert_tekstid &&
      erValgtSvarLiktSomSvar(valgtBosituasjon, svar.svar_tekstid, intl)
  );

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    >
      <SeksjonGruppe>
        <MultiSvarSpørsmål
          key={hovedSpørsmål.spørsmål_id}
          spørsmål={hovedSpørsmål}
          valgtSvar={bosituasjon.søkerDelerBoligMedAndreVoksne.svar_tekst}
          onChange={settBosituasjon}
        />
        {valgtSvarsalternativ && valgtSvarsalternativ.alert_tekstid ? (
          <KomponentGruppe>
            <AlertStripeAdvarsel className={'fjernBakgrunn'}>
              {valgtSvarsalternativ.svar_tekstid.split('.')[2] ===
              'neiMenTidligereSamboerRegistrert' ? (
                <FormattedHTMLMessage id={valgtSvarsalternativ.alert_tekstid} />
              ) : (
                <LocaleTekst tekst={valgtSvarsalternativ.alert_tekstid} />
              )}
            </AlertStripeAdvarsel>
          </KomponentGruppe>
        ) : null}
      </SeksjonGruppe>
      <SeksjonGruppe>
        <JaNeiSpørsmål spørsmål={skalSøkerGifteSegMedSamboer} />
      </SeksjonGruppe>

      <SeksjonGruppe>
        <OmSamboerenDin />
      </SeksjonGruppe>
    </Side>
  );
};
export default injectIntl(Bosituasjon);
