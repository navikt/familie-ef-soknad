export enum IKategori {
  Medlemskap = 'medlemskap',
  Barn = 'barn',
}

export enum Medlemskap {
  søkerBosattINorgeTreSisteÅr = 'søkerBosattINorgeTreSisteÅr',
  søkerOppholderSegINorge = 'søkerOppholderSegINorge',
  søkerErFlyktning = 'søkerErFlyktning',
}

export interface ISpørsmål {
  spørsmål_id: string;
  tekstid: string;
  kategori: IKategori;
  svaralternativer: ISvar[];
}

export interface ISvar {
  value: string;
  tekstid: string;
  checked?: boolean;
}
