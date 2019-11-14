export enum ISvar {
  JA = 'JA',
  NEI = 'NEI',
}

export interface ISpørsmål {
  spørsmål_id: string;
  tekstid: string;
  svaralternativer: ISvar[];
}
