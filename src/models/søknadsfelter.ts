export interface ITekstFelt {
  label: string;
  verdi: string;
}
export interface IBooleanFelt {
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

// --- Tomme objekt felter

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

export const nyttTekstListeFelt: ITekstListeFelt = {
  label: '',
  verdi: [],
};
