export interface ISøknadFelt {
  spørsmålid?: string;
  svarid?: string | string[];
}
export interface ITekstFelt extends ISøknadFelt {
  label: string;
  verdi: string;
}

export interface IBooleanFelt extends ISøknadFelt {
  label: string;
  verdi: boolean;
}

export interface IDatoFelt extends ISøknadFelt {
  label: string;
  verdi: Date;
}

export interface ITekstListeFelt extends ISøknadFelt {
  label: string;
  verdi: string[];
}
