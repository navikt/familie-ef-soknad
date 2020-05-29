import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from './søknadsfelter';

export interface IForelder {
  navn?: ITekstFelt;
  skalBarnetBoHosSøker?: ITekstFelt;
  fødselsdato?: IDatoFelt | null;
  personnr?: ITekstFelt;
  kanIkkeOppgiAnnenForelderFar?: IBooleanFelt;
  hvorforIkkeOppgi?: ISpørsmålFelt;
  ikkeOppgittAnnenForelderBegrunnelse?: ITekstFelt;
  borINorge?: IBooleanFelt;
  land?: ITekstFelt;
  avtaleOmDeltBosted?: ISpørsmålBooleanFelt;
  harAnnenForelderSamværMedBarn?: ITekstFelt;
  harDereSkriftligSamværsavtale?: ISpørsmålFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borISammeHus?: ITekstFelt;
  hvordanBorDere?: ITekstFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ITekstFelt;
  beskrivSamværUtenBarn?: ITekstFelt;
}

export enum EForelder {
  skalBarnetBoHosSøker = 'skalBarnetBoHosSøker',
  borINorge = 'borINorge',
  avtaleOmDeltBosted = 'avtaleOmDeltBosted',
  harAnnenForelderSamværMedBarn = 'harAnnenForelderSamværMedBarn',
  harDereSkriftligSamværsavtale = 'harDereSkriftligSamværsavtale',
  hvordanPraktiseresSamværet = 'hvordanPraktiseresSamværet',
  borISammeHus = 'borISammeHus',
  hvordanBorDere = 'hvordanBorDere',
  boddSammenFør = 'boddSammenFør',
  flyttetFra = 'flyttetFra',
  hvorMyeSammen = 'hvorMyeSammen',
  beskrivSamværUtenBarn = 'beskrivSamværUtenBarn',
}
