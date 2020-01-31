import { IPerson } from './person';
import { IVedlegg } from './vedlegg';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: boolean;
  søkerOppholderSegINorge?: boolean;
  søkerBosattINorgeSisteTreÅr?: boolean;
  søkerErFlyktning?: boolean;
  søkerHarSøktSeparasjon?: boolean;
  datoSøktSeparasjon?: Date;
  søkerGiftIUtlandet?: boolean;
  søkerSeparertEllerSkiltIUtlandet?: boolean;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
  begrunnelseForSøknad?: string;
  datoEndretSamvær?: Date;
  datoForSamlivsbrudd?: Date;
  datoFlyttetFraHverandre?: Date;
  begrunnelseAnnet?: string;
  vedleggsliste: IVedlegg[];
}

export interface IUtenlandsopphold {
  periode: IPeriode;
  ugyldig: boolean;
  begrunnelse: string;
}

export interface IPeriode {
  fra: Date;
  til: Date;
}
