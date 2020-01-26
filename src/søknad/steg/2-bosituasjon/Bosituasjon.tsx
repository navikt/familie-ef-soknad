import React, { FC, useEffect } from 'react';
import { IRoute, Routes } from '../../../routing/Routes';

import { FormattedHTMLMessage, injectIntl, IntlShape } from 'react-intl';
import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../routing/utils';
import { erValgtSvarLiktSomSvar } from '../../../utils/søknad';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import {
  delerSøkerBoligMedAndreVoksne,
  skalSøkerGifteSegMedSamboer,
} from './BosituasjonConfig';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import useSøknadContext from '../../../context/SøknadContext';
import { IMultiSpørsmål, IMultiSvar } from '../../../models/spørsmal';
import OmSamboerenDin from './OmSamboerenDin';
import { tomPersonInfo } from '../../../utils/person';

interface Props {
  intl: IntlShape;
}

const Bosituasjon: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;
  const { samboerDetaljer, søkerSkalGifteSegEllerBliSamboer } = bosituasjon;

  const hovedSpørsmål: IMultiSpørsmål = delerSøkerBoligMedAndreVoksne;
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const valgtBosituasjon: string = bosituasjon.søkerDelerBoligMedAndreVoksne
    .svar_tekst
    ? bosituasjon.søkerDelerBoligMedAndreVoksne.svar_tekst
    : '';

  const settSøkerDelerBoligMedAndreVoksne = (svar: string) => {
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

  const settSøkerSkalGifteSegEllerBliSamboer = (svar: boolean) => {
    console.log('settSøkermetode fyrer');
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerSkalGifteSegEllerBliSamboer: {
          nøkkel: skalSøkerGifteSegMedSamboer.spørsmål_id,
          spørsmål_tekst: intl.formatMessage({
            id: skalSøkerGifteSegMedSamboer.tekstid,
          }),
          svar: svar,
        },
      },
    });
  };

  const valgtSvar:
    | IMultiSvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(valgtBosituasjon, svar.svar_tekstid, intl)
  );

  const valgtSvarNøkkel = valgtSvar?.svar_tekstid.split('.')[2];

  const harSøkerSamboerOgLeverIEkteskapsliknendeForhold =
    valgtSvarNøkkel === 'jaHarSamboerOgEkteskapsliknendeForhold';

  const borAleneMedBarnEllerGravid =
    valgtSvarNøkkel === 'neiBorAleneMedBarnEllerGravid';
  const borMidlertidigFraHverandre =
    valgtSvarNøkkel === 'neiBorMidlertidigFraHverandre';
  const delerBoligMedAndreVoksne =
    valgtSvarNøkkel === 'jaDelerBoligMedAndreVoksne';

  const planerOmÅFlytteSammenEllerFåSamboer =
    borAleneMedBarnEllerGravid ||
    borMidlertidigFraHverandre ||
    delerBoligMedAndreVoksne;

  useEffect(() => {
    settSøknad({
      ...søknad,
      bosituasjon: { ...bosituasjon, samboerDetaljer: tomPersonInfo },
    });
    // eslint-disable-next-line
  }, []);

  console.log('marry', søkerSkalGifteSegEllerBliSamboer);

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
          onChange={settSøkerDelerBoligMedAndreVoksne}
        />
        {valgtSvar && valgtSvar.alert_tekstid ? (
          <KomponentGruppe>
            <AlertStripeAdvarsel className={'fjernBakgrunn'}>
              {valgtSvar.svar_tekstid.split('.')[2] ===
              'neiMenTidligereSamboerRegistrert' ? (
                <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
              ) : (
                <LocaleTekst tekst={valgtSvar.alert_tekstid} />
              )}
            </AlertStripeAdvarsel>
          </KomponentGruppe>
        ) : null}
      </SeksjonGruppe>
      {planerOmÅFlytteSammenEllerFåSamboer ? (
        <>
          <SeksjonGruppe>
            <JaNeiSpørsmål
              spørsmål={skalSøkerGifteSegMedSamboer}
              onChange={settSøkerSkalGifteSegEllerBliSamboer}
              valgtSvar={
                søkerSkalGifteSegEllerBliSamboer
                  ? søkerSkalGifteSegEllerBliSamboer.svar
                  : undefined
              }
            />
          </SeksjonGruppe>

          {samboerDetaljer && borMidlertidigFraHverandre ? (
            <SeksjonGruppe>
              <OmSamboerenDin samboerDetaljer={samboerDetaljer} />
            </SeksjonGruppe>
          ) : null}
        </>
      ) : null}

      {samboerDetaljer && harSøkerSamboerOgLeverIEkteskapsliknendeForhold ? (
        <SeksjonGruppe>
          <OmSamboerenDin samboerDetaljer={samboerDetaljer} />
        </SeksjonGruppe>
      ) : null}
    </Side>
  );
};
export default injectIntl(Bosituasjon);
