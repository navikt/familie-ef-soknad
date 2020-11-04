import {
  ISpørsmålFelt,
  ISpørsmålListeFelt,
  ITekstFelt,
  ITekstListeFelt,
} from '../models/søknad/søknadsfelter';
import { IPeriode } from '../models/felles/periode';

export const tomPeriode: IPeriode = {
  label: '',
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
  alternativer: [],
};

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

export const nyttTekstListeFelt: ITekstListeFelt = {
  label: '',
  verdi: [],
};
