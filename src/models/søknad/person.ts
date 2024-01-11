import { IBarn } from '../steg/barn';
import { IDatoFelt, ITekstFelt } from './søknadsfelter';

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

type Barn = Omit<IBarn, 'medforelder'> & {
  medforelder: Medforelder;
};

export type PersonData = {
  søker: ISøker;
  barn: Barn[];
  hash: string;
};

export const castPersonDataTilIPerson = (personData: PersonData): IPerson => {
  return {
    ...personData,
    barn: personData.barn.map((barn) => ({
      ...barn,
      medforelder: {
        label: 'Annen forelder',
        verdi: barn.medforelder,
      },
    })),
  };
};
