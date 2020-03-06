import { IPeriode } from '../models/søknad';
import { subDays } from 'date-fns';
import { dagensDato } from './dato';
import { ITekstFelt, ITekstListeFelt } from '../models/søknadsfelter';

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
