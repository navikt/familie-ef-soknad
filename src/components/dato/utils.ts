import { DatoBegrensning } from './Datovelger';
import { addYears, subYears } from 'date-fns';
import { dagensDato, erGyldigDato, strengTilDato } from '../../utils/dato';
import { IPeriode } from '../../models/felles/periode';

export const gyldigDato = (
  dato: string,
  datobegrensning: DatoBegrensning
): boolean => {
  return erGyldigDato(dato) && erDatoInnaforBegrensinger(dato, datobegrensning);
};

export const erDatoInnaforBegrensinger = (
  dato: string,
  datobegrensning: DatoBegrensning
): boolean => {
  switch (datobegrensning) {
    case DatoBegrensning.AlleDatoer:
      return dato !== '';

    case DatoBegrensning.FremtidigeDatoer:
      return (
        dato !== '' &&
        strengTilDato(dato) <= addYears(dagensDato, 100) &&
        strengTilDato(dato) >= dagensDato
      );

    case DatoBegrensning.TidligereDatoer:
      return (
        dato !== '' &&
        strengTilDato(dato) >= subYears(dagensDato, 100) &&
        strengTilDato(dato) <= dagensDato
      );
  }
};


