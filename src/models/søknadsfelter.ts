import { IDokumentasjon } from './dokumentasjon';

export interface ISøknadFelt {
  søknadsid: string;
  label: string;
  tekstid: string;
  dokumentasjon?: IDokumentasjon;
}

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
