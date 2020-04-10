import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from './søknadsfelter';

export interface IForelder {
  navn?: string;
  skalBarnBoHosDeg?: ITekstFelt;
  fødselsdato?: Date | null;
  personnr?: string;
  borINorge?: IBooleanFelt;
  avtaleOmDeltBosted?: IBooleanFelt;
  harAnnenForelderSamværMedBarn?: ITekstFelt;
  harDereSkriftligSamværsavtale?: ISpørsmålFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borISammeHus?: ITekstFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ITekstFelt;
}
