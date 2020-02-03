export enum ISvar {
  JA = 'svar.ja',
  NEI = 'svar.nei',
}

export const standardJaNeiSvar = [
  { svar_tekstid: ISvar.JA },
  { svar_tekstid: ISvar.NEI },
];

export interface LesMer {
  åpneTekstid: string;
  lukkeTekstid: string;
  innholdTekstid: string;
}

export interface IJaNeiSvar {
  svar_tekstid: ISvar;
  alert_tekstid?: string;
}

export interface IJaNeiSpørsmål {
  spørsmål_id: string;
  tekstid: string;
  lesmer?: LesMer;
  svaralternativer: IJaNeiSvar[];
}

export interface IMultiSvar {
  nøkkel?: string;
  svar_tekstid: string;
  alert_tekstid?: string;
}

export interface IMultiSpørsmål {
  spørsmål_id: string;
  tekstid: string;
  svaralternativer: IMultiSvar[];
}
