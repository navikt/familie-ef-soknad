export enum ESvar {
  JA = 'svar.ja',
  NEI = 'svar.nei',
}

export const JaNeiSvar = [
  { svar_tekstid: ESvar.JA },
  { svar_tekstid: ESvar.NEI },
];

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
  nøkkel?: string;
  svar_tekstid: string;
  alert_tekstid?: string;
}

export interface ITekst {
  nøkkel: string;
  label_tekstid: string;
  alert_tekstid?: string;
}
