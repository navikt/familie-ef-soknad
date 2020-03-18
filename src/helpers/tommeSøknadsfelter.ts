import { subDays } from 'date-fns';
import { dagensDato } from '../utils/dato';
import { ITekstFelt, ITekstListeFelt } from '../models/søknadsfelter';
import { IPeriode } from '../models/periode';

export const tomPeriode: IPeriode = {
  fra: {
    label: '',
    verdi: subDays(dagensDato, 1),
  },
  til: { label: '', verdi: dagensDato },
};

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

export const nyttTekstListeFelt: ITekstListeFelt = {
  label: '',
  verdi: [],
};
