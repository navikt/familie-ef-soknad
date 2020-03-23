import { IBooleanFelt, IDatoFelt, ITekstFelt } from '../../søknadsfelter';

export interface ISivilstatus {
  harSøktSeparasjon?: IBooleanFelt;
  datoSøktSeparasjon?: IDatoFelt;
  erUformeltGift?: IBooleanFelt;
  erUformeltSeparertEllerSkilt?: IBooleanFelt;
  begrunnelseForSøknad?: ITekstFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  datoEndretSamvær?: IDatoFelt;
  begrunnelseAnnet?: ITekstFelt;
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
  begrunnelseAnnet = 'begrunnelseAnnet',
}

export enum EBegrunnelseForSøknad {
  samlivsbruddForeldre = 'samlivsbruddForeldre',
  samlivsbruddAndre = 'samlivsbruddAndre',
  aleneFraFødsel = 'aleneFraFødsel',
  endringISamværsordning = 'endringISamværsordning',
  dødsfall = 'dødsfall',
  annet = 'annet',
}
