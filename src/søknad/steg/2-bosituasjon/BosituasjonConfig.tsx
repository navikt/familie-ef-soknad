import { ISpørsmål, JaNeiSvar } from '../../../models/spørsmal';
import { ESøkerDelerBolig } from '../../../models/bosituasjon';

export const delerSøkerBoligMedAndreVoksne: ISpørsmål = {
  søknadid: 'søkerDelerBoligMedAndreVoksne',
  tekstid: 'bosituasjon.spm.delerSøkerBoligMedAndreVoksne',
  svaralternativer: [
    {
      nøkkel: ESøkerDelerBolig.borAleneMedBarnEllerGravid,
      svar_tekstid: 'bosituasjon.svar.borAleneMedBarnEllerGravid',
    },
    {
      nøkkel: ESøkerDelerBolig.borMidlertidigFraHverandre,
      svar_tekstid: 'bosituasjon.svar.borMidlertidigFraHverandre',
      alert_tekstid: 'bosituasjon.alert.borMidlertidigFraHverandre',
    },
    {
      nøkkel: ESøkerDelerBolig.borSammenOgVenterBarn,
      svar_tekstid: 'bosituasjon.svar.borSammenOgVenterBarn',
      alert_tekstid: 'bosituasjon.alert.borSammenOgVenterBarn',
    },
    {
      nøkkel: ESøkerDelerBolig.harEkteskapsliknendeForhold,
      svar_tekstid: 'bosituasjon.svar.harEkteskapsliknendeForhold',
      alert_tekstid: 'bosituasjon.alert.harEkteskapsliknendeForhold',
    },
    {
      nøkkel: ESøkerDelerBolig.delerBoligMedAndreVoksne,
      svar_tekstid: 'bosituasjon.svar.delerBoligMedAndreVoksne',
    },
    {
      nøkkel: ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse,
      svar_tekstid:
        'bosituasjon.svar.tidligereSamboerFortsattRegistrertPåAdresse',
      alert_tekstid:
        'bosituasjon.alert.tidligereSamboerFortsattRegistrertPåAdresse',
    },
  ],
};

export const skalSøkerGifteSegMedSamboer: ISpørsmål = {
  søknadid: 'søkerSkalGifteSegMedSamboer',
  tekstid: 'bosituasjon.spm.skalSøkerGifteSegMedSamboer',
  svaralternativer: JaNeiSvar,
};
