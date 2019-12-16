export enum ISvar {
  JA = 'JA',
  NEI = 'NEI',
}

export interface LesMer {
  åpneTekstid: string;
  lukkeTekstid: string;
  innholdTekstid: string;
}

export interface IJaNeiSpørsmål {
  spørsmål_id: string;
  tekstid: string;
  lesmer?: LesMer;
  svaralternativer: ISvar[];
}

export interface IMultiSvar {
  svar_tekstid: string;
  alert_tekstid?: string;
}

export interface IMultiSpørsmål {
  spørsmål_id: string;
  tekstid: string;
  svaralternativer: IMultiSvar[];
}
