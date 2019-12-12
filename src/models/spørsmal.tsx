export enum ISvar {
  JA = 'JA',
  NEI = 'NEI',
}

export interface IJaNeiSpørsmål {
  spørsmål_id: string;
  tekstid: string;
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
