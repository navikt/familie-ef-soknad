import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EBosituasjon,
  ESøkerDelerBolig,
} from '../../../models/steg/bosituasjon';
import { JaNeiSvar } from '../../../helpers/svar';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';
import { LokalIntlShape } from '../../../language/typer';

// --- Dokumentasjon

const DokumentasjonBorPåUlikeAdresser: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonBorPåUlikeAdresser;

// --- Spørsmål

export enum bosituasjonSvar {
  borAleneMedBarnEllerGravid = 'bosituasjon.svar.borAleneMedBarnEllerGravid',
  borMidlertidigFraHverandre = 'bosituasjon.svar.borMidlertidigFraHverandre',
  borSammenOgVenterBarn = 'bosituasjon.svar.borSammenOgVenterBarn',
  harEkteskapsliknendeForhold = 'bosituasjon.svar.harEkteskapsliknendeForhold',
  delerBoligMedAndreVoksne = 'bosituasjon.svar.delerBoligMedAndreVoksne',
  tidligereSamboerFortsattRegistrertPåAdresse = 'bosituasjon.svar.tidligereSamboerFortsattRegistrertPåAdresse',
}


export const delerSøkerBoligMedAndreVoksne = (
  intl: LokalIntlShape
): ISpørsmål => ({
  søknadid: EBosituasjon.delerBoligMedAndreVoksne,
  tekstid: 'bosituasjon.spm.delerSøkerBoligMedAndreVoksne',
  flersvar: false,
  svaralternativer: [
    {
      id: ESøkerDelerBolig.borAleneMedBarnEllerGravid,
      svar_tekst: intl.formatMessage({
        id: bosituasjonSvar.borAleneMedBarnEllerGravid,
      }),
    },
    {
      id: ESøkerDelerBolig.borMidlertidigFraHverandre,
      svar_tekst: intl.formatMessage({
        id: 'bosituasjon.svar.borMidlertidigFraHverandre',
      }),
      alert_tekstid: bosituasjonSvar.borMidlertidigFraHverandre,
    },
    {
      id: ESøkerDelerBolig.borSammenOgVenterBarn,
      svar_tekst: intl.formatMessage({
        id: bosituasjonSvar.borSammenOgVenterBarn,
      }),
      alert_tekstid: 'bosituasjon.alert.borSammenOgVenterBarn',
    },
    {
      id: ESøkerDelerBolig.harEkteskapsliknendeForhold,
      svar_tekst: intl.formatMessage({
        id: bosituasjonSvar.harEkteskapsliknendeForhold,
      }),
      alert_tekstid: 'bosituasjon.alert.harEkteskapsliknendeForhold',
    },
    {
      id: ESøkerDelerBolig.delerBoligMedAndreVoksne,
      svar_tekst: intl.formatMessage({
        id: bosituasjonSvar.delerBoligMedAndreVoksne,
      }),
    },
    {
      id: ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse,
      svar_tekst: intl.formatMessage({
        id: bosituasjonSvar.tidligereSamboerFortsattRegistrertPåAdresse,
      }),
      alert_tekstid:
        'bosituasjon.alert.tidligereSamboerFortsattRegistrertPåAdresse',
      dokumentasjonsbehov: DokumentasjonBorPåUlikeAdresser,
    },
  ],
});

export const skalSøkerGifteSegMedSamboer = (
  intl: LokalIntlShape
): ISpørsmål => ({
  søknadid: EBosituasjon.skalGifteSegEllerBliSamboer,
  tekstid: 'bosituasjon.spm.skalSøkerGifteSegMedSamboer',
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});
