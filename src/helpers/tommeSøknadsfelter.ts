import { subDays } from 'date-fns';
import { dagensDato, dagensDatoStreng, datoTilStreng } from '../utils/dato';
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
    verdi: datoTilStreng(subDays(dagensDato, 1)),
  },
  til: { label: '', verdi: dagensDatoStreng },
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
