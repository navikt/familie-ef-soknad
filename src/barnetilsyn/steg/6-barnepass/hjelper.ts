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
import { erStrengGyldigTall } from '../../../utils/feltvalidering';

export const harBarnAvsluttetFjerdeKlasse = (fødselsdato: string): boolean => {
  const juniEllerFør = dagensDato.getMonth() < 6;
  const fødselsår: number = strengTilDato(fødselsdato).getFullYear();
  const gjeldendeÅr: number = dagensDato.getFullYear();

  if (juniEllerFør) {
    return fødselsår + 11 <= gjeldendeÅr;
  } else {
    return fødselsår + 10 <= gjeldendeÅr;
  }
};

export const erÅrsakBarnepassSpmBesvart = (barn: IBarn): boolean => {
  return (
    (harBarnAvsluttetFjerdeKlasse(barn.fødselsdato.verdi) &&
      barn.barnepass?.årsakBarnepass?.verdi !== undefined) ||
    !harBarnAvsluttetFjerdeKlasse(barn.fødselsdato.verdi)
  );
};

export const erBarnepassOrdningerUtfylt = (
  barnepassordninger: IBarnepassOrdning[]
): boolean => {
  const erBarnepassOrdningUtfylt = (barnepassordning: IBarnepassOrdning) => {
    const { hvaSlagsBarnepassOrdning, navn, periode, belop } = barnepassordning;
    return (
      hvaSlagsBarnepassOrdning?.verdi &&
      harValgtSvar(navn?.verdi) &&
      erPeriodeGyldig(periode) &&
      erStrengGyldigTall(belop?.verdi)
    );
  };

  return barnepassordninger.every((barnepassordning) =>
    erBarnepassOrdningUtfylt(barnepassordning)
  );
};

export const erBarnepassStegFerdigUtfylt = (
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

export const erSpørsmålSeksjonForBarnFerdigUtfylt = (barn: IBarn) => {
  const barnepass = barn.barnepass;
  return (
    erÅrsakBarnepassSpmBesvart(barn) &&
    barnepass?.barnepassordninger &&
    erBarnepassOrdningerUtfylt(barnepass?.barnepassordninger)
  );
};

export const erBarnepassForBarnFørNåværendeUtfylt = (
  barn: IBarn,
  barnSomSkalHaBarnepass: IBarn[]
): boolean => {
  const barnIndex: number = barnSomSkalHaBarnepass.indexOf(barn);

  return barnSomSkalHaBarnepass
    .filter((barn, index) => index < barnIndex)
    .every((barn) => erSpørsmålSeksjonForBarnFerdigUtfylt(barn));
};
