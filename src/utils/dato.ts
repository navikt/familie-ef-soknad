import { format, parse } from 'date-fns';

export const STANDARD_DATOFORMAT = 'dd.MM.yyyy';
export const FØDSELSNUMMER_DATOFORMAT = 'ddMMyy';
export const DATO_OG_TIME = 'HH:mm, dd.MM.yyyy';
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

export const formatDateHour = (date: Date) => {
  return format(date, DATO_OG_TIME);
};

export const datoTilStreng = (date: Date): string => {
  return date.toISOString();
};

export const strengTilDato = (datoStreng: string): Date => {
  return new Date(datoStreng);
};

export const tilDato = (dato: string | Date): Date => {
  return typeof dato === 'string' ? new Date(dato) : dato;
};

export const dagensDato = new Date();

export const dagensDatoStreng = datoTilStreng(new Date());
