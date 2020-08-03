import { subYears } from 'date-fns';
import { IBarn } from '../../../models/barn';
import {
  dagensDato,
  erPeriodeGyldig,
  strengTilDato,
} from '../../../utils/dato';
import { IBarnepassOrdning } from '../../models/barnepass';
import { ISøknad } from '../../models/søknad';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';

// ---- KONSTANTER

// ---- VALIDERING

export const harBarnAvsluttetFjerdeKlasse = (barn: IBarn): boolean => {
  const { alder, født, fødselsdato } = barn;
  const juniEllerFør = dagensDato.getUTCMonth() <= 6;

  if (født?.verdi && parseInt(alder.verdi) >= 10)
    if (juniEllerFør) {
      return subYears(dagensDato, 11) >= strengTilDato(fødselsdato.verdi);
    } else {
      return subYears(dagensDato, 10) >= strengTilDato(fødselsdato.verdi);
    }
  else return false;
};

export const erÅrsakBarnepassSpmBesvart = (barn: IBarn): boolean => {
  return (
    (harBarnAvsluttetFjerdeKlasse(barn) &&
      barn.barnepass?.årsakBarnepass?.verdi !== undefined) ||
    !harBarnAvsluttetFjerdeKlasse(barn)
  );
};

export const erBarnepassOrdningUtfylt = (
  barnepassordning: IBarnepassOrdning
) => {
  const { hvaSlagsBarnepassOrdning, navn, periode, belop } = barnepassordning;
  return (
    hvaSlagsBarnepassOrdning?.verdi &&
    harValgtSvar(navn?.verdi) &&
    erPeriodeGyldig(periode) &&
    harValgtSvar(belop?.verdi)
  );
};

export const erBarnepassOrdningerUtfylt = (
  barnepassordninger: IBarnepassOrdning[]
): boolean => {
  return barnepassordninger.every((barnepassordning) =>
    erBarnepassOrdningUtfylt(barnepassordning)
  );
};

export const erBarnepassFerdigUtfylt = (
  barnMedISøknad: IBarn[],
  søknad: ISøknad
): boolean => {
  const { søkerFraBestemtMåned, søknadsdato } = søknad;
  return (
    (søkerFraBestemtMåned?.svarid === ESøkerFraBestemtMåned.ja &&
      søknadsdato?.verdi !== undefined) ||
    søkerFraBestemtMåned?.svarid === ESøkerFraBestemtMåned.neiNavKanVurdere
  );
};

export const erBarnepassForAlleBarnUtfylt = (barn: IBarn[]) => {
  return barn.every(
    (barn) =>
      barn?.barnepass?.barnepassordninger &&
      erBarnepassOrdningerUtfylt(barn?.barnepass?.barnepassordninger)
  );
};
