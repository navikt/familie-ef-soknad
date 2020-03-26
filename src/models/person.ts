import { ITekstFelt, IBooleanFelt, IDatoFelt } from './søknadsfelter';

export interface IPerson {
  søker: ISøker;
  barn: IBarn[];
}

export interface ISøker {
  fnr: string;
  forkortetNavn: string;
  adresse: IAdresse;
  egenansatt: boolean;
  innvandretDato?: string;
  utvandretDato?: string;
  oppholdstillatelse?: string;
  sivilstand: string;
  språk: string;
  statsborgerskap: string;
  privattelefon?: string;
  mobiltelefon?: string;
  jobbtelefon?: string;
  bankkontonummer?: string;
}

export interface IAdresse {
  adresse: string;
  adressetillegg: string;
  kommune: string;
  postnummer: string;
}

export interface IBarn {
  id?: string;
  alder: ITekstFelt;
  fnr: ITekstFelt;
  fødselsdato: ITekstFelt;
  personnummer?: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  navn: ITekstFelt;
  født?: IBooleanFelt;
  lagtTil?: boolean;
  skalBarnBoHosDeg?: IBooleanFelt;
  forelder?: IForelder;
}

export interface IPersonDetaljer {
  navn?: string;
  fødselsdato?: Date;
  fødselsnummer?: string;
}

export interface IForelder {
  navn?: ITekstFelt;
  skalBarnBoHosDeg?: ITekstFelt;
  fødselsdato?: IDatoFelt;
  personnr?: ITekstFelt;
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
