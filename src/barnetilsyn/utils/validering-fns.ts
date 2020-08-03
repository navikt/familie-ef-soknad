import { IBarn } from '../../models/barn';
import { dagensDato, strengTilDato } from '../../utils/dato';
import { subYears } from 'date-fns';

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
