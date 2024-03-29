import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from '../søknad/søknadsfelter';

export interface IForelder {
  id?: string;
  navn?: ITekstFelt;
  skalBarnetBoHosSøker?: ISpørsmålFelt;
  fødselsdato?: IDatoFelt | null;
  ident?: ITekstFelt;
  kanIkkeOppgiAnnenForelderFar?: IBooleanFelt;
  hvorforIkkeOppgi?: ISpørsmålFelt;
  ikkeOppgittAnnenForelderBegrunnelse?: ITekstFelt;
  borINorge?: ISpørsmålBooleanFelt;
  land?: ISpørsmålFelt;
  avtaleOmDeltBosted?: ISpørsmålBooleanFelt;
  harAnnenForelderSamværMedBarn?: ISpørsmålFelt;
  harDereSkriftligSamværsavtale?: ISpørsmålFelt;
  hvordanPraktiseresSamværet?: ITekstFelt;
  borAnnenForelderISammeHus?: ISpørsmålFelt;
  borAnnenForelderISammeHusBeskrivelse?: ITekstFelt;
  boddSammenFør?: ISpørsmålBooleanFelt;
  flyttetFra?: IDatoFelt;
  hvorMyeSammen?: ISpørsmålFelt;
  beskrivSamværUtenBarn?: ITekstFelt;
  fraFolkeregister?: boolean;
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
