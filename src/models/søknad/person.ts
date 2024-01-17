import { IBarn } from '../steg/barn';
import { IDatoFelt, ITekstFelt } from './søknadsfelter';
import { hentTekst } from '../../utils/søknad';

export interface IPerson {
  hash: string;
  søker: ISøker;
  barn: IBarn[];
}

export interface IPersonTilGjenbruk {
  barn: IBarn[];
}

export interface ISøker {
  fnr: string;
  forkortetNavn: string;
  adresse: IAdresse;
  sivilstand: string;
  statsborgerskap: string;
  erStrengtFortrolig: boolean;
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

type Medforelder = {
  harAdressesperre: boolean;
  død: boolean;
  ident: string;
  navn: string;
  alder: number;
};

export type Barn = Omit<IBarn, 'medforelder'> & {
  medforelder?: Medforelder;
};

export type PersonData = {
  søker: ISøker;
  barn: Barn[];
  hash: string;
};
