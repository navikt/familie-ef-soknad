import { ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  EBosituasjon,
  ESøkerDelerBolig,
} from '../../../models/steg/bosituasjon';
import { JaNeiSvar } from '../../../helpers/svar';
import {
  BosituasjonDokumentasjon,
  IDokumentasjon,
} from '../../../models/dokumentasjon';

// --- Dokumentasjon

const DokumentasjonBorPåUlikeAdresser: IDokumentasjon = {
  id: BosituasjonDokumentasjon.BOR_PÅ_ULIKE_ADRESSER,
  spørsmålid: EBosituasjon.delerBoligMedAndreVoksne,
  svarid: ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse,
  label: '',
  tittel: 'dokumentasjon.ulikeAdresser.tittel',
  beskrivelse: 'dokumentasjon.ulikeAdresser.beskrivelse',
  harSendtInn: false,
};

// --- Spørsmål

export const delerSøkerBoligMedAndreVoksne: ISpørsmål = {
  søknadid: EBosituasjon.delerBoligMedAndreVoksne,
  tekstid: 'bosituasjon.spm.delerSøkerBoligMedAndreVoksne',
  flersvar: false,
  svaralternativer: [
    {
      id: ESøkerDelerBolig.borAleneMedBarnEllerGravid,
      svar_tekstid: 'bosituasjon.svar.borAleneMedBarnEllerGravid',
    },
    {
      id: ESøkerDelerBolig.borMidlertidigFraHverandre,
      svar_tekstid: 'bosituasjon.svar.borMidlertidigFraHverandre',
      alert_tekstid: 'bosituasjon.alert.borMidlertidigFraHverandre',
    },
    {
      id: ESøkerDelerBolig.borSammenOgVenterBarn,
      svar_tekstid: 'bosituasjon.svar.borSammenOgVenterBarn',
      alert_tekstid: 'bosituasjon.alert.borSammenOgVenterBarn',
    },
    {
      id: ESøkerDelerBolig.harEkteskapsliknendeForhold,
      svar_tekstid: 'bosituasjon.svar.harEkteskapsliknendeForhold',
      alert_tekstid: 'bosituasjon.alert.harEkteskapsliknendeForhold',
    },
    {
      id: ESøkerDelerBolig.delerBoligMedAndreVoksne,
      svar_tekstid: 'bosituasjon.svar.delerBoligMedAndreVoksne',
    },
    {
      id: ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse,
      svar_tekstid:
        'bosituasjon.svar.tidligereSamboerFortsattRegistrertPåAdresse',
      alert_tekstid:
        'bosituasjon.alert.tidligereSamboerFortsattRegistrertPåAdresse',
      dokumentasjonsbehov: DokumentasjonBorPåUlikeAdresser,
    },
  ],
};

export const skalSøkerGifteSegMedSamboer: ISpørsmål = {
  søknadid: EBosituasjon.skalGifteSegEllerBliSamboer,
  tekstid: 'bosituasjon.spm.skalSøkerGifteSegMedSamboer',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
