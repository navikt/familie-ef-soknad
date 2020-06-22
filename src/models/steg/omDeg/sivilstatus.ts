import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålFelt,
  ISpørsmålBooleanFelt,
} from '../../søknadsfelter';
import { IPersonDetaljer } from '../../person';

export enum ESivilstand {
  GIFT = 'GIFT',
  REPA = 'REPA',
  UGIF = 'UGIF',
  ENKE = 'ENKE',
  GJPA = 'GJPA',
  SEPA = 'SEPA',
  SEPR = 'SEPR',
  SKIL = 'SKIL',
  SKPA = 'SKPA',
}

export interface ISivilstatus {
  harSøktSeparasjon?: IBooleanFelt;
  datoSøktSeparasjon?: IDatoFelt;
  erUformeltGift?: ISpørsmålBooleanFelt;
  erUformeltSeparertEllerSkilt?: ISpørsmålBooleanFelt;
  årsakEnslig?: ISpørsmålFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  datoEndretSamvær?: IDatoFelt;
  tidligereSamboerDetaljer?: IPersonDetaljer;
}

export enum EBegrunnelse {
  samlivsbruddForeldre = 'samlivsbruddForeldre',
  samlivsbruddAndre = 'samlivsbruddAndre',
  aleneFraFødsel = 'aleneFraFødsel',
  endringISamværsordning = 'endringISamværsordning',
  dødsfall = 'dødsfall',
  annet = 'annet',
}

export enum ESivilstatusSøknadid {
  harSøktSeparasjon = 'harSøktSeparasjon',
  datoSøktSeparasjon = 'datoSøktSeparasjon',
  erUformeltGift = 'erUformeltGift',
  erUformeltSeparertEllerSkilt = 'erUformeltSeparertEllerSkilt',
  årsakEnslig = 'årsakEnslig',
  datoForSamlivsbrudd = 'datoForSamlivsbrudd',
  datoFlyttetFraHverandre = 'datoFlyttetFraHverandre',
  datoEndretSamvær = 'datoEndretSamvær',
}
