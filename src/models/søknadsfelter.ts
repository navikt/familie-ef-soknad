export interface ISøknadFelt {
  spørsmålid: string;
  svarid: string;
}

export interface ITekstFelt {
  label: string;
  verdi: string;
}

export interface IBooleanFelt extends ISøknadFelt {
  label: string;
  verdi: boolean;
}

export interface IDatoFelt {
  label: string;
  verdi: Date;
}

export interface ITekstListeFelt {
  label: string;
  verdi: string[];
}

export interface ISpørsmålFelt extends ITekstFelt {
  spørsmålid: string;
  svarid: string;
}

export interface ISpørsmålListeFelt extends ITekstListeFelt {
  spørsmålid: string;
  svarid: string[];
}
