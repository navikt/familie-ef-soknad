import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EHvorforIkkeOppgi,
} from '../models/steg/barnasbosted';
import { IForelder } from '../models/forelder';
import { isValid } from 'date-fns';

export const visBostedOgSamværSeksjon = (forelder: IForelder) => {
  const erAnnetBegrunnelseUtfylt =
    forelder.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet &&
    forelder.ikkeOppgittAnnenForelderBegrunnelse?.verdi !==
      forelder.hvorforIkkeOppgi.verdi &&
    forelder.ikkeOppgittAnnenForelderBegrunnelse?.verdi !== '';

  const kanIkkeOppgiDenAndreForelderen =
    forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
    (forelder.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.donorbarn ||
      erAnnetBegrunnelseUtfylt);

  return kanIkkeOppgiDenAndreForelderen || isValid(forelder.fødselsdato?.verdi);
};

export const harForelderSamværMedBarn = (svarid: string | undefined) => {
  switch (svarid) {
    case EHarSamværMedBarn.jaIkkeMerEnnVanlig:
      return false;
    case EHarSamværMedBarn.jaMerEnnVanlig:
      return true;
    case EHarSamværMedBarn.nei:
      return true;

    default:
      return false;
  }
};
export const harSkriftligSamværsavtale = (svarid: string | undefined) => {
  switch (svarid) {
    case EHarSkriftligSamværsavtale.jaKonkreteTidspunkter:
      return true;
    case EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter:
      return true;
    case EHarSkriftligSamværsavtale.nei:
      return false;

    default:
      return false;
  }
};
