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
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { dagensDato } from '../../../utils/dato';

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

  const settDatoSøkerSkalGifteSegEllerBliSamboer = (dato: Date | null) => {
    console.log('sett Dato søker skl bli samboer');
  };

  const valgtSvar:
    | IMultiSvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(valgtBosituasjon, svar.svar_tekstid, intl)
  );

  const valgtSvarNøkkel = valgtSvar?.svar_tekstid.split('.')[2];

  const harSøkerSamboerOgLeverIEkteskapsliknendeForhold =
    valgtSvarNøkkel === 'harEkteskapsliknendeForhold';

  const borAleneMedBarnEllerGravid =
    valgtSvarNøkkel === 'borAleneMedBarnEllerGravid';
  const borMidlertidigFraHverandre =
    valgtSvarNøkkel === 'borMidlertidigFraHverandre';
  const delerBoligMedAndreVoksne =
    valgtSvarNøkkel === 'delerBoligMedAndreVoksne';

  const planerOmÅFlytteSammenEllerFåSamboer =
    borAleneMedBarnEllerGravid ||
    borMidlertidigFraHverandre ||
    delerBoligMedAndreVoksne ||
    valgtSvarNøkkel === 'tidligereSamboerFortsattRegistrertPåAdresse';

  useEffect(() => {
    settSøknad({
      ...søknad,
      bosituasjon: { ...bosituasjon, samboerDetaljer: tomPersonInfo },
    });
    /*const objektnøkkel = 'samboerDetaljer';
      const {
        [objektnøkkel]: _,
        ...nyBosituasjonUtenSamboerDetaljer
      } = bosituasjon;
      settSøknad({
        ...søknad,
        bosituasjon: { ...nyBosituasjonUtenSamboerDetaljer },*/

    // eslint-disable-next-line
  }, []);

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
          <AlertStripeAdvarsel className={'fjernBakgrunn'}>
            {valgtSvar.svar_tekstid.split('.')[2] ===
            'tidligereSamboerFortsattRegistrertPåAdresse' ? (
              <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
            ) : (
              <LocaleTekst tekst={valgtSvar.alert_tekstid} />
            )}
          </AlertStripeAdvarsel>
        ) : null}
      </SeksjonGruppe>
      {planerOmÅFlytteSammenEllerFåSamboer ? (
        <>
          <SeksjonGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål
                spørsmål={skalSøkerGifteSegMedSamboer}
                onChange={settSøkerSkalGifteSegEllerBliSamboer}
                valgtSvar={
                  søkerSkalGifteSegEllerBliSamboer
                    ? søkerSkalGifteSegEllerBliSamboer.svar
                    : undefined
                }
              />
            </KomponentGruppe>
            {søkerSkalGifteSegEllerBliSamboer?.svar === true &&
            samboerDetaljer ? (
              <>
                <KomponentGruppe>
                  <Datovelger
                    valgtDato={dagensDato}
                    tekstid={'datovelger.nårSkalDetteSkje'}
                    datobegrensning={DatoBegrensning.FremtidigeDatoer}
                    settDato={(e) =>
                      settDatoSøkerSkalGifteSegEllerBliSamboer(e)
                    }
                  />
                </KomponentGruppe>
                <KomponentGruppe>
                  <OmSamboerenDin
                    tittel={
                      'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed'
                    }
                    samboerDetaljer={samboerDetaljer}
                  />
                </KomponentGruppe>
              </>
            ) : null}
          </SeksjonGruppe>
        </>
      ) : null}

      {samboerDetaljer && harSøkerSamboerOgLeverIEkteskapsliknendeForhold ? (
        <SeksjonGruppe>
          <OmSamboerenDin
            tittel={'bosituasjon.tittel.omSamboer'}
            samboerDetaljer={samboerDetaljer}
            ekteskapsLiknendeForhold={
              harSøkerSamboerOgLeverIEkteskapsliknendeForhold
            }
          />
        </SeksjonGruppe>
      ) : null}
    </Side>
  );
};
export default injectIntl(Bosituasjon);
