import React, { FC, useEffect, useState } from 'react';
import { IRoute, Routes } from '../../../routing/Routes';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../routing/utils';
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
import { erValgtSvarLiktSomSvar } from '../../../utils/søknad';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;
  const { søkerDelerBoligMedAndreVoksne } = bosituasjon;
  const [svarPåHovedspørsmål, settSvarPåHovedspørsmål] = useState('');

  const hovedSpørsmål: IMultiSpørsmål = delerSøkerBoligMedAndreVoksne;
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const valgtBosituasjon: string = bosituasjon.søkerDelerBoligMedAndreVoksne
    .verdi
    ? bosituasjon.søkerDelerBoligMedAndreVoksne.verdi
    : '';

  const settBosituasjonFelt = (spørsmål: string, svar: string) => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerDelerBoligMedAndreVoksne: {
          label: spørsmål,
          verdi: svar,
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

  const planerOmÅFlytteSammenEllerFåSamboer =
    valgtSvarNøkkel === ESøkerDelerBolig.borAleneMedBarnEllerGravid ||
    valgtSvarNøkkel === ESøkerDelerBolig.delerBoligMedAndreVoksne ||
    valgtSvarNøkkel ===
      ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse;

  useEffect(() => {
    const erSpørsmålOgSvarTomme =
      søkerDelerBoligMedAndreVoksne.label === '' && svarPåHovedspørsmål === '';

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
      søkerDelerBoligMedAndreVoksne.verdi !== svarPåHovedspørsmål;

    !erSpørsmålOgSvarTomme &&
      harValgtNyttSvarsalternativ &&
      resetBosituasjon(søkerDelerBoligMedAndreVoksne.verdi);
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
          valgtSvar={bosituasjon.søkerDelerBoligMedAndreVoksne.verdi}
          onChange={settBosituasjonFelt}
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
export default Bosituasjon;
