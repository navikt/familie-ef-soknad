import {
  format,
  formatISO,
  isValid,
  parse,
  isAfter,
  setHours,
  setMinutes,
  addDays,
  addMonths,
  startOfDay,
  startOfToday,
} from 'date-fns';
import subMonths from 'date-fns/subMonths';
import { nb } from 'date-fns/locale';
import { IPeriode } from '../models/felles/periode';

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

export const formatIsoDate = (date: Date) => {
  return formatISO(date, { representation: 'date' });
};

export const formatDateFnr = (date: Date) => {
  return format(date, FØDSELSNUMMER_DATOFORMAT);
};

export const formatDateHour = (date: Date) => {
  return format(date, DATO_OG_TIME);
};

export const datoTilStreng = (date: Date): string => {
  return startOfDay(date).toISOString();
};

export const strengTilDato = (datoStreng: string): Date => {
  return startOfDay(new Date(datoStreng));
};

export const tilDato = (dato: string | Date): Date => {
  return typeof dato === 'string' ? startOfDay(new Date(dato)) : dato;
};

export const formatMånederTilbake = (dato: Date, antallMåneder: number) => {
  const nyDato = subMonths(dato, antallMåneder);

  return format(nyDato, 'MMMM yyyy', { locale: nb });
};

export const dagensDato = startOfToday();

export const dagensDatoMedTidspunktStreng = new Date().toISOString();

export const erGyldigDato = (verdi: string | undefined): boolean => {
  return verdi ? isValid(new Date(verdi)) : false;
};

// Vedlegg er lagret ut neste døgn
export const erVedleggstidspunktGyldig = (verdi: string): boolean => {
  const grenseTidForVedlegg = addDays(
    setMinutes(setHours(new Date(verdi), 23), 59),
    1
  );
  return isAfter(grenseTidForVedlegg, dagensDato);
};

export const erPeriodeGyldig = (periode: IPeriode | undefined): boolean => {
  return erGyldigDato(periode?.fra.verdi) && erGyldigDato(periode?.til.verdi);
};

export const erEnMånedTilbakeITid = (dato: string): boolean => {
  return !isAfter(strengTilDato(dato), addMonths(dagensDato, -1));
};
