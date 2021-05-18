import { DatoBegrensning } from './Datovelger';
import { addYears, compareAsc, isEqual, subYears } from 'date-fns';
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

export const gyldigPeriode = (
  periode: IPeriode,
  datobegrensning: DatoBegrensning
): boolean => {
  const { fra, til } = periode;

  const gyldigFraDato: boolean = gyldigDato(periode.fra.verdi, datobegrensning);
  const gyldigTilDato: boolean = gyldigDato(periode.til.verdi, datobegrensning);

  const fom: Date | undefined =
    periode.fra.verdi !== '' ? strengTilDato(fra.verdi) : undefined;
  const tom: Date | undefined =
    periode.til.verdi !== '' ? strengTilDato(til.verdi) : undefined;

  const erFraDatoSenereEnnTilDato: boolean =
    fom && tom ? compareAsc(fom, tom) === -1 : true;
  const erDatoerLike = fom && tom ? isEqual(fom, tom) : false;

  return (
    erFraDatoSenereEnnTilDato && !erDatoerLike && gyldigTilDato && gyldigFraDato
  );
};

export const hentStartOgSluttDato = (
  periode: IPeriode
): {
  startDato: Date | undefined;
  sluttDato: Date | undefined;
} => {
  const { til, fra } = periode;
  const sluttDato: Date | undefined =
    til.verdi !== '' ? strengTilDato(til.verdi) : undefined;
  const startDato: Date | undefined =
    fra.verdi !== '' ? strengTilDato(fra.verdi) : undefined;
  return { startDato, sluttDato };
};

export const erFraDatoSenereEnnTilDato = (
  startDato: Date | undefined,
  sluttDato: Date | undefined
): boolean | undefined =>
  startDato && sluttDato && compareAsc(startDato, sluttDato) === -1;

export const erDatoerLike = (
  startDato: Date | undefined,
  sluttDato: Date | undefined
): boolean | undefined =>
  startDato && sluttDato && isEqual(startDato, sluttDato);
