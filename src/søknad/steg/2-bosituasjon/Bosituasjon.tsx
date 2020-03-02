import React, { FC, useEffect, useState } from 'react';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import OmSamboerenDin from './OmSamboerenDin';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import SøkerSkalFlytteSammenEllerFåSamboer from './SøkerSkalFlytteSammenEllerFåSamboer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { delerSøkerBoligMedAndreVoksne } from './BosituasjonConfig';
import { erValgtSvarLiktSomSvar, hentTekst } from '../../../utils/søknad';
import { ESøkerDelerBolig, IBosituasjon } from '../../../models/bosituasjon';
import { ISpørsmål, ISvar } from '../../../models/spørsmal';
import useSøknadContext from '../../../context/SøknadContext';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();

  const [bosituasjon, settBosituasjon] = useState<IBosituasjon>({
    søkerDelerBoligMedAndreVoksne: {
      label: '',
      verdi: '',
    },
  });
  useEffect(() => {
    settSøknad({ ...søknad, bosituasjon: bosituasjon });
    // eslint-disable-next-line
  }, [bosituasjon]);

  const oppdaterBosituasjon = (nyBosituasjon: IBosituasjon) =>
    settBosituasjon({ ...bosituasjon, ...nyBosituasjon });

  const hovedSpørsmål: ISpørsmål = delerSøkerBoligMedAndreVoksne;

  const settBosituasjonFelt = (spørsmål: ISpørsmål, svar: string) => {
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    if (!bosituasjon.søkerDelerBoligMedAndreVoksne.verdi) {
      oppdaterBosituasjon({
        søkerDelerBoligMedAndreVoksne: {
          label: spørsmålTekst,
          verdi: svar,
        },
      });
    } else if (svar !== bosituasjon.søkerDelerBoligMedAndreVoksne.verdi) {
      settBosituasjon({
        søkerDelerBoligMedAndreVoksne: {
          label: spørsmålTekst,
          verdi: svar,
        },
      });
    }
  };

  const valgtSvar:
    | ISvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(
      bosituasjon.søkerDelerBoligMedAndreVoksne.verdi,
      svar.svar_tekstid,
      intl
    )
  );

  const valgtSvarNøkkel = valgtSvar?.svar_tekstid.split('.')[2];

  const harSøkerEkteskapsliknendeForhold =
    valgtSvarNøkkel === ESøkerDelerBolig.harEkteskapsliknendeForhold;

  const planerOmÅFlytteSammenEllerFåSamboer =
    valgtSvarNøkkel === ESøkerDelerBolig.borAleneMedBarnEllerGravid ||
    valgtSvarNøkkel === ESøkerDelerBolig.delerBoligMedAndreVoksne ||
    valgtSvarNøkkel ===
      ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse;

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}>
      <SeksjonGruppe>
        <MultiSvarSpørsmål
          key={hovedSpørsmål.søknadid}
          spørsmål={hovedSpørsmål}
          valgtSvar={bosituasjon.søkerDelerBoligMedAndreVoksne.verdi}
          settSpørsmålOgSvar={settBosituasjonFelt}
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
          <SøkerSkalFlytteSammenEllerFåSamboer
            settBosituasjon={settBosituasjon}
            bosituasjon={bosituasjon}
          />
        </SeksjonGruppe>
      ) : null}

      {harSøkerEkteskapsliknendeForhold ? (
        <SeksjonGruppe>
          <OmSamboerenDin
            tittel={'bosituasjon.tittel.omSamboer'}
            ekteskapsLiknendeForhold={harSøkerEkteskapsliknendeForhold}
            settBosituasjon={settBosituasjon}
            bosituasjon={bosituasjon}
          />
        </SeksjonGruppe>
      ) : null}
    </Side>
  );
};
export default Bosituasjon;
