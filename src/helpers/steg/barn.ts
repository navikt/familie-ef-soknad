import { IntlShape } from 'react-intl';
import { hentFeltObjekt, hentTekst } from '../../utils/søknad';
import { differenceInYears } from 'date-fns';
import { dagensDato, formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/uuid';
import { EBarn, IBarn } from '../../models/barn';
import { ESvar } from '../../models/spørsmålogsvar';

export const hentNyttBarn = (
  ident: string,
  barnDato: Date | undefined,
  navn: string,
  boHosDeg: string,
  født: boolean,
  intl: IntlShape
): IBarn => {
  return {
    ident: hentFeltObjekt('person.ident', ident, intl),
    alder: hentFeltObjekt(
      'person.alder',
      differenceInYears(dagensDato, barnDato ? barnDato : dagensDato),
      intl
    ),
    navn: hentFeltObjekt('person.navn', navn, intl),
    født: {
      spørsmålid: EBarn.født,
      svarid: født ? ESvar.JA : ESvar.NEI,
      label: hentTekst('barnekort.spm.født', intl),
      verdi: født,
    },
    fødselsdato: hentFeltObjekt(
      født ? 'person.fødselsdato' : 'barnadine.termindato',
      barnDato ? formatIsoDate(barnDato) : undefined,
      intl
    ),
    harSammeAdresse: hentFeltObjekt(
      'barnekort.spm.sammeAdresse',
      boHosDeg === ESvar.JA ? true : boHosDeg === ESvar.NEI ? false : undefined,
      intl
    ),
    lagtTil: true,
    id: hentUid(),
  };
};
