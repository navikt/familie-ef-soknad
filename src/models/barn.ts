import {
  IBooleanFelt,
  ISpørsmålBooleanFelt,
  ITekstFelt,
} from './søknadsfelter';
import { IForelder } from './forelder';

export interface IBarn {
  id: string;
  alder: ITekstFelt;
  fødselsdato: ITekstFelt;
  ident: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  navn: ITekstFelt;
  født?: ISpørsmålBooleanFelt;
  lagtTil?: boolean;
  forelder?: IForelder;
  medISøknad?: IBooleanFelt;
}

export enum EBarn {
  alder = 'alder',
  fødselsdato = 'fødselsdato',
  ident = 'ident',
  harSammeAdresse = 'harSammeAdresse',
  navn = 'navn',
  født = 'født',
  skalBarnetBoHosSøker = 'skalBarnetBoHosSøker',
  forelder = 'forelder',
  medISøknad = 'medISøknad',
}
