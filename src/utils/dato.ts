import moment from 'moment';
import 'moment/min/locales';
import 'moment/locale/nb';
moment.locale('nb');

export const STANDARD_DATOFORMAT = 'DD.MM.YYYY';

export const formatDate = (date: Date, locale: string = 'nb') => {
  const format = STANDARD_DATOFORMAT;

  return moment(date)
    .locale(locale)
    .format(Array.isArray(format) ? format[0] : format);
};

export const resetDatoISøknad = (dato: Date | undefined) => {};
