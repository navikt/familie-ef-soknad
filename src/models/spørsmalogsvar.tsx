export enum ESvar {
  JA = 'JA',
  NEI = 'NEI',
}

export enum ESvarTekstid {
  JA = 'svar.ja',
  NEI = 'svar.nei',
}

export interface LesMer {
  åpneTekstid: string;
  lukkeTekstid: string;
  innholdTekstid: string;
}

export interface ISpørsmål {
  søknadid: string;
  tekstid: string;
  lesmer?: LesMer;
  svaralternativer: ISvar[];
}

export interface ISvar {
  id: string;
  svar_tekstid: string;
  alert_tekstid?: string;
}

export interface ITekst {
  nøkkel: string;
  label_tekstid: string;
  alert_tekstid?: string;
}
