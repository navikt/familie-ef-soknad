import { IntlShape } from 'react-intl';
import { hentFeltObjekt, hentTekst } from '../utils/søknad';
import { differenceInYears } from 'date-fns';
import { dagensDato, formatDate } from '../utils/dato';
import { hentUid } from '../utils/uuid';
import { EBarn, IBarn } from '../models/barn';
import { ESvar } from '../models/spørsmålogsvar';

export const hentNyttBarn = (
  fødselsnummer: string,
  personnummer: string,
  barnDato: Date,
  navn: string,
  boHosDeg: string,
  født: boolean,
  intl: IntlShape
): IBarn => {
  return {
    fnr: hentFeltObjekt('person.fnr', fødselsnummer, intl),
    personnummer: hentFeltObjekt('barnadine.personnummer', personnummer, intl),
    alder: hentFeltObjekt(
      'person.alder',
      differenceInYears(dagensDato, barnDato),
      intl
    ),
    navn: hentFeltObjekt('person.navn', navn, intl),
    fødselsdato: hentFeltObjekt(
      'person.fødselsdato',
      formatDate(barnDato),
      intl
    ),
    harSammeAdresse: hentFeltObjekt(
      'barnekort.spm.sammeAdresse',
      boHosDeg === ESvar.JA ? true : boHosDeg === ESvar.NEI ? false : undefined,
      intl
    ),
    født: {
      spørsmålid: EBarn.født,
      svarid: født ? ESvar.JA : ESvar.NEI,
      label: hentTekst('barnekort.spm.født', intl),
      verdi: født,
    },
    lagtTil: true,
    id: hentUid(),
  };
};
