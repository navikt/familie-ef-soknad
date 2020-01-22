import React, { FC, SyntheticEvent } from 'react';
import { IRoute, Routes } from '../../../config/Routes';

import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../utils/routing';
import { injectIntl, IntlShape } from 'react-intl';
import SeksjonGruppe from '../../../components/SeksjonGruppe';
import KomponentGruppe from '../../../components/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import {
  delerSøkerBoligMedAndreVoksne,
  skalSøkerGifteSegMedSamboer,
} from '../../../config/BosituasjonConfig';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import useSøknadContext from '../../../context/SøknadContext';
import { IMultiSpørsmål, IMultiSvar } from '../../../models/spørsmal';
import { hentValgtBosituasjonITekst } from '../../../utils/søknad';
import { IBosituasjon, ISpørsmålOgSvar } from '../../../models/søknad';

interface Props {
  intl: IntlShape;
}

const Bosituasjon: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const valgtBosituasjon: string = bosituasjon.søkerDelerBoligMedAndreVoksne
    .svar
    ? bosituasjon.søkerDelerBoligMedAndreVoksne.svar
    : '';

  const neiBorMidlertidigFraHverandre =
    valgtBosituasjon ===
    hentValgtBosituasjonITekst(
      'bosituasjon.svar.neiBorMidlertidigFraHverandre',
      intl
    );

  const settBosituasjon = (svar: string) => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerDelerBoligMedAndreVoksne: {
          spørsmål: intl.formatMessage({
            id: delerSøkerBoligMedAndreVoksne.spørsmål_id,
          }),
          svar: svar,
        },
      },
    });
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    >
      <SeksjonGruppe>
        <MultiSvarSpørsmål
          key={delerSøkerBoligMedAndreVoksne.spørsmål_id}
          spørsmål={delerSøkerBoligMedAndreVoksne}
          valgtSvar={bosituasjon.søkerDelerBoligMedAndreVoksne.svar}
          onChange={settBosituasjon}
        />
        {neiBorMidlertidigFraHverandre ? (
          <KomponentGruppe>
            <AlertStripeAdvarsel className={'fjernBakgrunn'}>
              <LocaleTekst
                tekst={
                  delerSøkerBoligMedAndreVoksne.svaralternativer[1]
                    .alert_tekstid!
                }
              />
            </AlertStripeAdvarsel>
          </KomponentGruppe>
        ) : null}
      </SeksjonGruppe>
      <SeksjonGruppe>
        <JaNeiSpørsmål spørsmål={skalSøkerGifteSegMedSamboer} />
      </SeksjonGruppe>
    </Side>
  );
};
export default injectIntl(Bosituasjon);
