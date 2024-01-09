import {
  IBooleanFelt,
  ISpørsmålBooleanFelt,
  ITekstFelt,
} from '../søknad/søknadsfelter';
import { IForelder } from './forelder';
import { IMedforelderFelt, IMedforelderPersonData } from './medforelder';
import { IBarnepass } from '../../barnetilsyn/models/barnepass';

export interface IBarn {
  id: string;
  fnr?: string;
  alder: ITekstFelt;
  fødselsdato: ITekstFelt;
  ident: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  navn: ITekstFelt;
  født?: ISpørsmålBooleanFelt;
  lagtTil?: boolean;
  forelder?: IForelder;
  særligeTilsynsbehov?: ITekstFelt;
  skalHaBarnepass?: IBooleanFelt; // Gjelder kun barnetilsyn
  barnepass?: IBarnepass; // Gjelder kun barnetilsyn
  harAdressesperre?: boolean;
  medforelder?: IMedforelderFelt;
  annenForelderId?: string; // Gjelder kun for visning av avhuking i frontend
}
export interface IBarnXX {
  id: string;
  fnr?: string;
  alder: ITekstFelt;
  fødselsdato: ITekstFelt;
  ident: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  navn: ITekstFelt;
  født?: ISpørsmålBooleanFelt;
  lagtTil?: boolean;
  forelder?: IForelder;
  særligeTilsynsbehov?: ITekstFelt;
  skalHaBarnepass?: IBooleanFelt; // Gjelder kun barnetilsyn
  barnepass?: IBarnepass; // Gjelder kun barnetilsyn
  harAdressesperre?: boolean;
  medforelder?: IMedforelderPersonData;
  annenForelderId?: string; // Gjelder kun for visning av avhuking i frontend
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
  skalHaBarnepass = 'skalHaBarnepass',
}
