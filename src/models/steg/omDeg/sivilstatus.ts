import {
  IBooleanFelt,
  IDatoFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from '../../søknadsfelter';

export enum ESivilstand {
  GIFT = 'GIFT',
  UGIF = 'UGIF',
  ENKE = 'ENKE',
  SEPA = 'SEPA',
  SKIL = 'SKIL',
}

export interface ISivilstatus {
  søkerHarSøktSeparasjon?: IBooleanFelt;
  datoSøktSeparasjon?: IDatoFelt;
  søkerGiftIUtlandet?: IBooleanFelt;
  søkerSeparertEllerSkiltIUtlandet?: IBooleanFelt;
  begrunnelseForSøknad?: ISpørsmålFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  datoEndretSamvær?: IDatoFelt;
  begrunnelseAnnet?: ITekstFelt;
}

export enum EBegrunnelse {
  samlivsbruddForeldre = 'samlivsbruddForeldre',
  samlivsbruddAndre = 'samlivsbruddAndre',
  aleneFraFødsel = 'aleneFraFødsel',
  endringISamværsordning = 'endringISamværsordning',
  dødsfall = 'dødsfall',
  annet = 'annet',
}
