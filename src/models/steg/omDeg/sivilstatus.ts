import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålFelt,
  ISpørsmålBooleanFelt,
} from '../../søknad/søknadsfelter';
import { IPersonDetaljer } from '../../søknad/person';

export enum ESivilstand {
  //GIFT = 'GIFT',
  REPA = 'REPA',
  UGIF = 'UGIF',
  ENKE = 'ENKE',
  GJPA = 'GJPA',
  SEPA = 'SEPA',
  SEPR = 'SEPR',
  SKIL = 'SKIL',
  SKPA = 'SKPA',
  SAMB = 'SAMB',

  UOPPGITT = 'UOPPGITT',
  UGIFT = 'UGIFT',
  GIFT = 'GIFT',
  ENKE_ELLER_ENKEMANN = 'ENKE_ELLER_ENKEMANN',
  SKILT = 'SKILT',
  SEPARERT = 'SEPARERT',
  PARTNER = 'PARTNER',
  SEPARERT_PARTNER = 'SEPARERT_PARTNER',
  SKILT_PARTNER = 'SKILT_PARTNER',
  GJENLEVENDE_PARTNER = 'GJENLEVENDE_PARTNER',
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
