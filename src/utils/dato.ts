import { format, parse } from 'date-fns';

export const STANDARD_DATOFORMAT = 'dd.MM.yyyy';
export const FØDSELSNUMMER_DATOFORMAT = 'ddMMyy';
export const GYLDIGE_DATOFORMAT = [
  'dd.MM.yyyy',
  'ddMMyyyy',
  'dd.MM.yy',
  'ddMMyy',
];

export const parseDate = (date: string) => {
  return parse(date, STANDARD_DATOFORMAT, new Date());
};

export const formatDate = (date: Date) => {
  return format(date, STANDARD_DATOFORMAT);
};

export const formatDateFnr = (date: Date) => {
  return format(date, FØDSELSNUMMER_DATOFORMAT);
};

export const dagensDato = new Date();

export const zeroPad = (num: number) => {
  return String(num).padStart(2, '0');
};
