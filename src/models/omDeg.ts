import { IBooleanFelt, IDatoFelt, ITekstFelt } from './søknadsfelter';
import { IPeriode } from './søknad';

export interface ISivilstatus {
  søkerHarSøktSeparasjon?: ITekstFelt;
  datoSøktSeparasjon?: IDatoFelt;
  søkerGiftIUtlandet?: IBooleanFelt;
  søkerSeparertEllerSkiltIUtlandet?: IBooleanFelt;
  begrunnelseForSøknad?: ITekstFelt;
  datoEndretSamvær?: IDatoFelt;
  datoForSamlivsbrudd?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  begrunnelseAnnet?: ITekstFelt;
}

export interface IMedlemskap {
  søkerOppholderSegINorge?: IBooleanFelt;
  søkerBosattINorgeSisteTreÅr?: IBooleanFelt;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
  søkerErFlyktning?: IBooleanFelt;
}

export interface IUtenlandsopphold {
  periode: IPeriode;
  ugyldig: boolean;
  begrunnelse: string;
}
