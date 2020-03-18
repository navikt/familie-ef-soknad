import { IHjelpetekst } from './hjelpetekst';
import { IDokumentasjon } from './dokumentasjon';

export interface ILabel {
  søknadid: string;
  tekstid: string;
}

export interface ISpørsmål extends ILabel {
  lesmer?: IHjelpetekst;
  svaralternativer: ISvar[];
}

// TODO: Kan ISVar extende ILabel?
export interface ISvar {
  nøkkel?: string;
  svar_tekstid: string;
  alert_tekstid?: string;
  dokumentasjonsbehov?: IDokumentasjon;
}

export enum ESvar {
  JA = 'svar.ja',
  NEI = 'svar.nei',
}

export interface ITekst {
  nøkkel: string;
  label_tekstid: string;
  alert_tekstid?: string;
}
