import { IBooleanFelt, IDatoFelt, ITekstFelt } from '../../søknadsfelter';

export interface ISivilstatus {
  søkerHarSøktSeparasjon?: IBooleanFelt;
  datoSøktSeparasjon?: IDatoFelt;
  søkerGiftIUtlandet?: IBooleanFelt;
  søkerSeparertEllerSkiltIUtlandet?: IBooleanFelt;
  begrunnelseForSøknad?: ITekstFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  datoEndretSamvær?: IDatoFelt;
  begrunnelseAnnet?: ITekstFelt;
}
