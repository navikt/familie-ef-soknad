import { IPerson } from './person';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerOppholderSegINorge?: boolean;
  søkerBosattINorgeSisteTreÅr?: boolean;
  søkerErFlyktning?: boolean;
  søkerHarSøktSeparasjon?: boolean;
  datoSøktSeparasjon?: Date;
  søkerGiftIUtlandet?: boolean;
  søkerSeparertEllerSkiltIUtlandet?: boolean;
  perioderBoddIUtlandet?: IPeriode[];
  begrunnelseForSøknad?: string;
  datoEndretSamvær?: Date;
  datoFlyttetFraHverandre?: Date;
}

export interface IPeriode {
  fra: Date | string;
  til: Date | string;
  ugyldig: boolean;
  begrunnelse: string;
}
