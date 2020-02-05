import React, { FC, useEffect, useState } from 'react';
import { IRoute, Routes } from '../../../routing/Routes';
import { FormattedHTMLMessage, injectIntl, IntlShape } from 'react-intl';
import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../routing/utils';
import { erValgtSvarLiktSomSvar } from '../../../utils/søknad';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { delerSøkerBoligMedAndreVoksne } from './BosituasjonConfig';
import useSøknadContext from '../../../context/SøknadContext';
import { IMultiSpørsmål, IMultiSvar } from '../../../models/spørsmal';
import OmSamboerenDin from './OmSamboerenDin';
import SøkerSkalFlytteSammenEllerFåSamboer from './SøkerSkalFlytteSammenEllerFåSamboer';
import { ESøkerDelerBolig } from '../../../models/bosituasjon';

interface Props {
  intl: IntlShape;
}

const Bosituasjon: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;
  const { søkerDelerBoligMedAndreVoksne } = bosituasjon;
  const [svarPåHovedspørsmål, settSvarPåHovedspørsmål] = useState('');

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
    svarPåHovedspørsmål === '' && settSvarPåHovedspørsmål(svar);
  };

  const valgtSvar:
    | IMultiSvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(valgtBosituasjon, svar.svar_tekstid, intl)
  );

  const valgtSvarNøkkel = valgtSvar?.svar_tekstid.split('.')[2];

  const harSøkerEkteskapsliknendeForhold =
    valgtSvarNøkkel === ESøkerDelerBolig.harEkteskapsliknendeForhold;

  const planerOmÅFlytteSammenEllerFåSamboer = hovedSpørsmål.svaralternativer.find(
    (svar: IMultiSvar) => {
      return valgtSvarNøkkel === svar.svar_tekstid.split('.')[2];
    }
  );

  useEffect(() => {
    const erSpørsmålOgSvarTomme =
      søkerDelerBoligMedAndreVoksne.spørsmål_tekst === '' &&
      svarPåHovedspørsmål === '';

    const resetBosituasjon = (svar: string) => {
      settSøknad({
        ...søknad,
        bosituasjon: {
          søkerDelerBoligMedAndreVoksne: søkerDelerBoligMedAndreVoksne,
        },
      });
      settSvarPåHovedspørsmål(svar);
    };
    const harValgtNyttSvarsalternativ =
      søkerDelerBoligMedAndreVoksne.svar_tekst !== svarPåHovedspørsmål;

    !erSpørsmålOgSvarTomme &&
      harValgtNyttSvarsalternativ &&
      resetBosituasjon(søkerDelerBoligMedAndreVoksne.svar_tekst);
  }, [settSøknad, svarPåHovedspørsmål, søkerDelerBoligMedAndreVoksne, søknad]);

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[1].path}
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
            ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse ? (
              <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
            ) : (
              <LocaleTekst tekst={valgtSvar.alert_tekstid} />
            )}
          </AlertStripeAdvarsel>
        ) : null}
      </SeksjonGruppe>

      {planerOmÅFlytteSammenEllerFåSamboer ? (
        <SeksjonGruppe>
          <SøkerSkalFlytteSammenEllerFåSamboer />
        </SeksjonGruppe>
      ) : null}

      {harSøkerEkteskapsliknendeForhold ? (
        <SeksjonGruppe>
          <OmSamboerenDin
            tittel={'bosituasjon.tittel.omSamboer'}
            ekteskapsLiknendeForhold={harSøkerEkteskapsliknendeForhold}
          />
        </SeksjonGruppe>
      ) : null}
    </Side>
  );
};
export default injectIntl(Bosituasjon);
