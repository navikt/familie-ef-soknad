import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EHvorforIkkeOppgi,
  EHvorMyeSammen,
} from '../models/steg/barnasbosted';
import { EForelder, IForelder } from '../models/forelder';
import { isValid } from 'date-fns';
import { ESvar, ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { harValgtSvar } from '../utils/spørsmålogsvar';

export const visBostedOgSamværSeksjon = (
  forelder: IForelder,
  visesBorINorgeSpørsmål: boolean
) => {
  const {
    hvorforIkkeOppgi,
    kanIkkeOppgiAnnenForelderFar,
    ikkeOppgittAnnenForelderBegrunnelse,
  } = forelder;

  const erAnnetBegrunnelseUtfylt =
    hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet &&
    ikkeOppgittAnnenForelderBegrunnelse?.verdi !== hvorforIkkeOppgi.verdi &&
    ikkeOppgittAnnenForelderBegrunnelse?.verdi !== '';

  const kanIkkeOppgiDenAndreForelderen =
    kanIkkeOppgiAnnenForelderFar && hvorforIkkeOppgi
      ? kanIkkeOppgiAnnenForelderFar?.verdi &&
        (hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.donorbarn ||
          erAnnetBegrunnelseUtfylt)
      : false;

  const borForelderINorgeSpm =
    forelder.borINorge?.svarid === ESvar.JA ||
    (forelder.land && forelder.land?.verdi !== '');

  return (
    kanIkkeOppgiDenAndreForelderen ||
    (visesBorINorgeSpørsmål
      ? borForelderINorgeSpm
      : isValid(forelder.fødselsdato?.verdi))
  );
};

export const harForelderSamværMedBarn = (svarid: string | undefined) => {
  switch (svarid) {
    case EHarSamværMedBarn.jaIkkeMerEnnVanlig:
      return true;
    case EHarSamværMedBarn.jaMerEnnVanlig:
      return true;
    case EHarSamværMedBarn.nei:
      return false;

    default:
      return false;
  }
};
export const harSkriftligSamværsavtale = (svarid: string | undefined) => {
  switch (svarid) {
    case EHarSkriftligSamværsavtale.jaKonkreteTidspunkter:
      return false;
    case EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter:
      return true;
    case EHarSkriftligSamværsavtale.nei:
      return true;

    default:
      return false;
  }
};

export const visSpørsmålHvisIkkeSammeForelder = (forelder: IForelder) => {
  if (forelder.harAnnenForelderSamværMedBarn?.svarid === EHarSamværMedBarn.nei)
    return true;
  else if (
    forelder.harDereSkriftligSamværsavtale?.svarid ===
    EHarSkriftligSamværsavtale.jaKonkreteTidspunkter
  )
    return true;
  else if (
    forelder.hvordanPraktiseresSamværet &&
    forelder.hvordanPraktiseresSamværet?.verdi !== ''
  )
    return true;

  return false;
};

export const hvisEndretSvarSlettFeltHvordanPraktiseresSamværet = (
  spørsmål: ISpørsmål,
  svar: ISvar
) => {
  return (
    (spørsmål.søknadid === EForelder.harDereSkriftligSamværsavtale &&
      svar.id === EHarSkriftligSamværsavtale.nei) ||
    (spørsmål.søknadid === EForelder.harAnnenForelderSamværMedBarn &&
      svar.id === EHarSamværMedBarn.nei)
  );
};

export const erAlleFelterOgSpørsmålBesvart = (
  forelder: IForelder,
  barnHarSammeForelder: boolean | undefined
): boolean => {
  const {
    harAnnenForelderSamværMedBarn,
    harDereSkriftligSamværsavtale,
    hvordanPraktiseresSamværet,
    hvorMyeSammen,
    beskrivSamværUtenBarn,
  } = forelder;
  if (harValgtSvar(barnHarSammeForelder) && barnHarSammeForelder === true) {
    return (
      harAnnenForelderSamværMedBarn?.svarid === EHarSamværMedBarn.nei ||
      harDereSkriftligSamværsavtale?.svarid ===
        EHarSkriftligSamværsavtale.jaKonkreteTidspunkter ||
      harValgtSvar(hvordanPraktiseresSamværet?.verdi)
    );
  } else {
    return (
      (harValgtSvar(hvorMyeSammen?.verdi) &&
        hvorMyeSammen?.svarid !== EHvorMyeSammen.møtesUtenom) ||
      harValgtSvar(beskrivSamværUtenBarn?.verdi)
    );
  }
};
