import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from './søknadsfelter';

export interface IForelder {
  id?: string;
  navn?: ITekstFelt;
  skalBarnetBoHosSøker?: ISpørsmålFelt;
  fødselsdato?: IDatoFelt | null;
  personnr?: ITekstFelt;
  kanIkkeOppgiAnnenForelderFar?: IBooleanFelt;
  hvorforIkkeOppgi?: ISpørsmålFelt;
  ikkeOppgittAnnenForelderBegrunnelse?: ITekstFelt;
  borINorge?: ISpørsmålBooleanFelt;
  land?: ITekstFelt;
  avtaleOmDeltBosted?: ISpørsmålBooleanFelt;
  harAnnenForelderSamværMedBarn?: ISpørsmålFelt;
  harDereSkriftligSamværsavtale?: ISpørsmålFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borAnnenForelderISammeHus?: ISpørsmålFelt;
  borAnnenForelderISammeHusBeskrivelse?: ISpørsmålFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ISpørsmålFelt;
  beskrivSamværUtenBarn?: ITekstFelt;
}

export enum EForelder {
  skalBarnetBoHosSøker = 'skalBarnetBoHosSøker',
  borINorge = 'borINorge',
  avtaleOmDeltBosted = 'avtaleOmDeltBosted',
  hvorforIkkeOppgi = 'hvorforIkkeOppgi',

  harAnnenForelderSamværMedBarn = 'harAnnenForelderSamværMedBarn',
  harDereSkriftligSamværsavtale = 'harDereSkriftligSamværsavtale',
  hvordanPraktiseresSamværet = 'hvordanPraktiseresSamværet',
  borAnnenForelderISammeHus = 'borAnnenForelderISammeHus',
  borAnnenForelderISammeHusBeskrivelse = 'borAnnenForelderISammeHusBeskrivelse',
  boddSammenFør = 'boddSammenFør',
  flyttetFra = 'flyttetFra',
  hvorMyeSammen = 'hvorMyeSammen',
  beskrivSamværUtenBarn = 'beskrivSamværUtenBarn',
}
