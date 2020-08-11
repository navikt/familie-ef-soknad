import { IBarn } from '../steg/barn';
import { IDatoFelt, ITekstFelt } from './søknadsfelter';

export interface IPerson {
  hash: string;
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
  sivilstand?: string;
  språk: string;
  statsborgerskap: string;
  kontakttelefon?: string;
  bankkontonummer?: string;
}

export interface IAdresse {
  adresse: string;
  postnummer: string;
  poststed?: string;
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
