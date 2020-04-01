import { IBooleanFelt, IDatoFelt, ITekstFelt } from './søknadsfelter';

export interface IForelder {
  navn?: string;
  skalBarnBoHosDeg?: ITekstFelt;
  fødselsdato?: Date | null;
  personnr?: string;
  borINorge?: IBooleanFelt;
  avtaleOmDeltBosted?: IBooleanFelt;
  harAnnenForelderSamværMedBarn?: ITekstFelt;
  harDereSkriftligSamværsavtale?: ITekstFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borISammeHus?: ITekstFelt;
  boddSammenFør?: IBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ITekstFelt;
}
