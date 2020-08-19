import { IntlShape } from 'react-intl';
import { hentFeltObjekt, hentTekst } from '../../utils/søknad';
import { differenceInYears } from 'date-fns';
import { dagensDato, formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import { EBarn, IBarn } from '../../models/steg/barn';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import navfaker from 'nav-faker';

export const hentNyttBarn = (
  id: string | undefined,
  ident: string,
  barnDato: Date | undefined,
  navn: string,
  boHosDeg: string,
  født: boolean,
  intl: IntlShape,
  skalHaBarnepass?: boolean
): IBarn => {
  if (!barnDato && ident) {
    barnDato = navfaker.personIdentifikator.getFødselsdato(ident);
  }
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
    id: id === undefined ? hentUid() : id,
    skalHaBarnepass: hentFeltObjekt(
      'barnekort.skalHaBarnepass',
      !!skalHaBarnepass,
      intl
    ),
  };
};
