import { IPerson } from './person';

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
  bosituasjon: IBosituasjon;
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

export interface IBosituasjon {
  søkerDelerBoligMedAndreVoksne: ISpørsmålOgMultiSvar;
  søkerSkalGifteSegEllerBliSamboer?: ISpørsmålOgJaNeiSvar;
  datoFlyttetSammenMedSamboer?: Date;
  samboerDetaljer?: IPersonDetaljer;
}

export interface IPersonDetaljer {
  navn: string;
  fødselsdato: Date;
  fødselsnummer: string;
}
