import React, { FC, useEffect, useState } from 'react';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import OmSamboerenDin from './OmSamboerenDin';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import SøkerSkalFlytteSammenEllerFåSamboer from './SøkerSkalFlytteSammenEllerFåSamboer';
import AlertStripe from 'nav-frontend-alertstriper';
import { delerSøkerBoligMedAndreVoksne } from './BosituasjonConfig';
import { hentTekst } from '../../../utils/søknad';
import {
  ESøkerDelerBolig,
  IBosituasjon,
} from '../../../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../../../models/spørsmalogsvar';
import useSøknadContext from '../../../context/SøknadContext';
import { erValgtSvarLiktSomSvar } from '../../../utils/spørsmålogsvar';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const hovedSpørsmål: ISpørsmål = delerSøkerBoligMedAndreVoksne;

  const [bosituasjon, settBosituasjon] = useState<IBosituasjon>({
    delerBoligMedAndreVoksne: {
      spørsmålid: hovedSpørsmål.søknadid,
      svarid: '',
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

  const settBosituasjonFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const svarTekst: string = hentTekst(svar.svar_tekstid, intl);
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    const nyBosituasjon = {
      delerBoligMedAndreVoksne: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: spørsmålTekst,
        verdi: svarTekst,
      },
    };

    if (!bosituasjon.delerBoligMedAndreVoksne.verdi) {
      oppdaterBosituasjon(nyBosituasjon);
    } else if (svarTekst !== bosituasjon.delerBoligMedAndreVoksne.verdi) {
      settBosituasjon(nyBosituasjon);
    }
  };

  const valgtSvar:
    | ISvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(
      bosituasjon.delerBoligMedAndreVoksne.verdi,
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
          valgtSvar={bosituasjon.delerBoligMedAndreVoksne.verdi}
          settSpørsmålOgSvar={settBosituasjonFelt}
        />
        {valgtSvar && valgtSvar.alert_tekstid ? (
          <AlertStripe type={'advarsel'} form={'inline'}>
            {valgtSvar.svar_tekstid.split('.')[2] ===
            ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse ? (
              <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
            ) : (
              <LocaleTekst tekst={valgtSvar.alert_tekstid} />
            )}
          </AlertStripe>
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
