import { IHjelpetekst } from './hjelpetekst';
import { IDokumentasjon } from './dokumentasjon';

export enum ESvar {
  JA = 'JA',
  NEI = 'NEI',
}

export enum ESvarTekstid {
  JA = 'svar.ja',
  NEI = 'svar.nei',
}

export interface ILabel {
  søknadid: string;
  tekstid: string;
}

export interface ISpørsmål extends ILabel {
  lesmer?: IHjelpetekst;
  svaralternativer: ISvar[];
}

export interface ISvar {
  id: string;
  svar_tekstid: string;
  alert_tekstid?: string;
  dokumentasjonsbehov?: IDokumentasjon;
}

export interface ITekst {
  id: string;
  label_tekstid: string;
  alert_tekstid?: string;
}
