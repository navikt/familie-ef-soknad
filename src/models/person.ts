import { IBarn } from './barn';
import { IDatoFelt, ITekstFelt } from './søknadsfelter';

export interface IPerson {
  hash: string;
  søker: ISøker;
  barn: IBarn[];
}

export interface ISøker {
  ident: string;
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

export interface IPersonDetaljer {
  navn?: ITekstFelt;
  ident?: ITekstFelt;
  fødselsdato?: IDatoFelt;
  kjennerIkkeIdent: boolean;
}

export enum EPersonDetaljer {
  navn = 'navn',
  ident = 'ident',
  fødselsdato = 'fødselsdato',
  kjennerIkkeIdent = 'kjennerIkkeIdent',
}
