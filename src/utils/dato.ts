import { format, parse } from 'date-fns';
import subMonths from 'date-fns/subMonths';
import { nb } from 'date-fns/locale';

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

export const formatNårSøkerDuStønadFraMåned = (
  dato: Date,
  antallMåneder: number
) => {
  const nyDato = subMonths(dato, antallMåneder);

  return format(nyDato, 'MMMM yyyy', { locale: nb });
};

export const dagensDato = new Date();
