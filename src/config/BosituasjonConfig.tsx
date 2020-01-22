import {
  IJaNeiSpørsmål,
  IMultiSpørsmål,
  standardJaNeiSvar,
} from '../models/spørsmal';

export const delerSøkerBoligMedAndreVoksne: IMultiSpørsmål = {
  spørsmål_id: 'søkerDelerBoligMedAndreVoksne',
  tekstid: 'bosituasjon.spm.delerSøkerBoligMedAndreVoksne',
  svaralternativer: [
    { svar_tekstid: 'bosituasjon.svar.neiBorAleneMedBarnEllerGravid' },
    {
      svar_tekstid: 'bosituasjon.svar.neiBorMidlertidigFraHverandre',
      alert_tekstid: 'bosituasjon.alert.neiBorMidlertidigFraHverandre',
    },
    {
      svar_tekstid: 'bosituasjon.svar.jaBorSammenOgVenterBarn',
      alert_tekstid: 'bosituasjon.alert.jaBorSammenOgVenterBarn',
    },
    {
      svar_tekstid: 'bosituasjon.svar.jaHarSamboerOgEkteskapsliknendeForhold',
      alert_tekstid: 'bosituasjon.alert.jaHarSamboerOgEkteskapsliknendeForhold',
    },
    { svar_tekstid: 'bosituasjon.svar.jaDelerBoligMedAndreVoksne' },
    {
      svar_tekstid: 'bosituasjon.svar.neiMenTidligereSamboerRegistrert',
      alert_tekstid: 'bosituasjon.alert.neiMenTidligereSamboerRegistrert',
    },
  ],
};

export const skalSøkerGifteSegMedSamboer: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerSkalGifteSegMedSamboer',
  tekstid: 'bosituasjon.spm.skalSøkerGifteSegMedSamboer',
  svaralternativer: standardJaNeiSvar,
};
