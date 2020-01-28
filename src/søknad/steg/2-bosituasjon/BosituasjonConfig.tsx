import {
  IJaNeiSpørsmål,
  IMultiSpørsmål,
  standardJaNeiSvar,
} from '../../../models/spørsmal';

export const delerSøkerBoligMedAndreVoksne: IMultiSpørsmål = {
  spørsmål_id: 'søkerDelerBoligMedAndreVoksne',
  tekstid: 'bosituasjon.spm.delerSøkerBoligMedAndreVoksne',
  svaralternativer: [
    { svar_tekstid: 'bosituasjon.svar.borAleneMedBarnEllerGravid' },
    {
      svar_tekstid: 'bosituasjon.svar.borMidlertidigFraHverandre',
      alert_tekstid: 'bosituasjon.alert.borMidlertidigFraHverandre',
    },
    {
      svar_tekstid: 'bosituasjon.svar.borSammenOgVenterBarn',
      alert_tekstid: 'bosituasjon.alert.borSammenOgVenterBarn',
    },
    {
      svar_tekstid: 'bosituasjon.svar.harEkteskapsliknendeForhold',
      alert_tekstid: 'bosituasjon.alert.harEkteskapsliknendeForhold',
    },
    { svar_tekstid: 'bosituasjon.svar.delerBoligMedAndreVoksne' },
    {
      svar_tekstid:
        'bosituasjon.svar.tidligereSamboerFortsattRegistrertPåAdresse',
      alert_tekstid:
        'bosituasjon.alert.tidligereSamboerFortsattRegistrertPåAdresse',
    },
  ],
};

export const skalSøkerGifteSegMedSamboer: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerSkalGifteSegMedSamboer',
  tekstid: 'bosituasjon.spm.skalSøkerGifteSegMedSamboer',
  svaralternativer: standardJaNeiSvar,
};
