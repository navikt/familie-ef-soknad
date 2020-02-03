import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { IMedlemskap, ISivilstatus, IUtenlandsopphold } from './omDeg';
import { IBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from './bosituasjon';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: IBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
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
  bosituasjon: IBosituasjon;
}

export interface IPeriode {
  fra: Date;
  til: Date;
}

export interface ISpørsmålOgMultiSvar {
  nøkkel: string;
  spørsmål_tekst: string;
  svar_tekst: string;
}

export interface ISpørsmålOgJaNeiSvar {
  nøkkel: string;
  spørsmål_tekst: string;
  svar: boolean;
}
