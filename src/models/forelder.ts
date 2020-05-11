import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from './søknadsfelter';

export interface IForelder {
  navn?: ITekstFelt;
  skalBarnBoHosDeg?: ITekstFelt;
  fødselsdato?: IDatoFelt | null;
  personnr?: ITekstFelt;
  borINorge?: IBooleanFelt;
  avtaleOmDeltBosted?: ISpørsmålBooleanFelt;
  harAnnenForelderSamværMedBarn?: ITekstFelt;
  harDereSkriftligSamværsavtale?: ISpørsmålFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borISammeHus?: ITekstFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ITekstFelt;
}

export enum EForelder {
  skalBarnBoHosDeg = 'skalBarnBoHosDeg',
  borINorge = 'borINorge',
  avtaleOmDeltBosted = 'avtaleOmDeltBosted',
  harAnnenForelderSamværMedBarn = 'harAnnenForelderSamværMedBarn',
  harDereSkriftligSamværsavtale = 'harDereSkriftligSamværsavtale',
  hvordanPraktiseresSamværet = 'hvordanPraktiseresSamværet',
  borISammeHus = 'borISammeHus',
  boddSammenFør = 'boddSammenFør',
  flyttetFra = 'flyttetFra',
  hvorMyeSammen = 'hvorMyeSammen',
}
