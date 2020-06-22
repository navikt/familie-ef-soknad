import {
  ISpørsmålFelt,
  ISpørsmålListeFelt,
  ITekstFelt,
  ITekstListeFelt,
} from '../models/søknadsfelter';
import { IPeriode } from '../models/periode';

export const tomPeriode: IPeriode = {
  fra: {
    label: '',
    verdi: '',
  },
  til: { label: '', verdi: '' },
};

export const nyttSpørsmålFelt: ISpørsmålFelt = {
  spørsmålid: '',
  svarid: '',
  label: '',
  verdi: '',
};

export const nyttSpørsmålListeFelt: ISpørsmålListeFelt = {
  spørsmålid: '',
  svarid: [],
  label: '',
  verdi: [],
};

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

export const nyttTekstListeFelt: ITekstListeFelt = {
  label: '',
  verdi: [],
};
