import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from './søknadsfelter';

export interface IForelder {
  navn?: ITekstFelt;
  skalBarnBoHosDeg?: ISpørsmålFelt;
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
  borISammeHus?: ITekstFelt;
  hvordanBorDere?: ITekstFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ITekstFelt;
  beskrivSamværUtenBarn?: ITekstFelt;
}

export enum EForelder {
  skalBarnBoHosDeg = 'skalBarnBoHosDeg',
  borINorge = 'borINorge',
  avtaleOmDeltBosted = 'avtaleOmDeltBosted',
  hvorforIkkeOppgi = 'hvorforIkkeOppgi',

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
