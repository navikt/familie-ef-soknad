import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålFelt,
  ISpørsmålBooleanFelt,
} from '../../søknadsfelter';

export enum ESivilstand {
  GIFT = 'GIFT',
  UGIF = 'UGIF',
  ENKE = 'ENKE',
  SEPA = 'SEPA',
  SKIL = 'SKIL',
}

export interface ISivilstatus {
  harSøktSeparasjon?: IBooleanFelt;
  datoSøktSeparasjon?: IDatoFelt;
  erUformeltGift?: ISpørsmålBooleanFelt;
  erUformeltSeparertEllerSkilt?: ISpørsmålBooleanFelt;
  begrunnelseForSøknad?: ISpørsmålFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  datoEndretSamvær?: IDatoFelt;
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
  begrunnelseForSøknad = 'begrunnelseForSøknad',
  datoForSamlivsbrudd = 'datoForSamlivsbrudd',
  datoFlyttetFraHverandre = 'datoFlyttetFraHverandre',
  datoEndretSamvær = 'datoEndretSamvær',
}
