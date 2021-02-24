import {
  EBorAnnenForelderISammeHus,
  EHvorforIkkeOppgi,
  EHvorMyeSammen,
} from '../../../models/steg/barnasbosted';
import {
  harForelderSamværMedBarn,
  måBeskriveSamværet,
} from '../../../helpers/steg/forelder';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import { IForelder } from '../../../models/steg/forelder';
import { erGyldigDato } from '../../../utils/dato';

export const erAlleForeldreUtfylt = (foreldre: IForelder[]) =>
  foreldre.every((forelder) => erForelderUtfylt(forelder));

export const erForelderUtfylt = (forelder: IForelder): boolean | undefined => {
  const forelderHarNavn = forelder?.navn?.verdi !== '';
  const utfyltBorINorge =
    forelder?.borINorge?.verdi ||
    (forelder?.borINorge?.verdi === false && forelder.land?.verdi !== '');

  const utfyltAvtaleDeltBosted = harValgtSvar(
    forelder?.avtaleOmDeltBosted?.verdi
  );
  const forelderInfoOgSpørsmålBesvart: boolean | undefined =
    forelderHarNavn &&
    utfyltBorINorge &&
    utfyltAvtaleDeltBosted &&
    utfyltNødvendigeSamværSpørsmål(forelder) &&
    utfyltNødvendigBostedSpørsmål(forelder);

  const kanIkkeOppgiAnnenForelderRuteUtfylt = utfyltNødvendigSpørsmålUtenOppgiAnnenForelder(
    forelder
  );

  return forelderInfoOgSpørsmålBesvart || kanIkkeOppgiAnnenForelderRuteUtfylt;
};

export const utfyltNødvendigBostedSpørsmål = (forelder?: IForelder) => {
  const utfyltBorISammeHus =
    forelder?.borINorge?.verdi &&
    forelder?.borAnnenForelderISammeHus?.svarid ===
      EBorAnnenForelderISammeHus.ja
      ? forelder?.borAnnenForelderISammeHusBeskrivelse?.verdi !== ''
      : true;
  const utfyltBoddSammenFør =
    forelder?.boddSammenFør?.svarid === ESvar.JA
      ? harValgtSvar(forelder?.boddSammenFør?.verdi) &&
        erGyldigDato(forelder.flyttetFra?.verdi)
      : harValgtSvar(forelder?.boddSammenFør?.verdi);
  const utfyltHvorMyeSammen =
    forelder?.hvorMyeSammen?.svarid === EHvorMyeSammen.møtesUtenom
      ? harValgtSvar(forelder.beskrivSamværUtenBarn?.verdi)
      : harValgtSvar(forelder?.hvorMyeSammen?.verdi);

  return utfyltBorISammeHus && utfyltBoddSammenFør && utfyltHvorMyeSammen;
};

export const utfyltNødvendigSpørsmålUtenOppgiAnnenForelder = (
  forelder?: IForelder
) => {
  const pgaDonorBarn =
    forelder?.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.donorbarn;
  const pgaAnnet =
    forelder?.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet &&
    forelder?.ikkeOppgittAnnenForelderBegrunnelse?.verdi !== '';

  return (
    forelder?.kanIkkeOppgiAnnenForelderFar?.verdi && (pgaDonorBarn || pgaAnnet)
  );
};

export const utfyltNødvendigeSamværSpørsmål = (forelder?: IForelder) => {
  const harIkkeAvtaleOmDeltBosted =
    forelder?.avtaleOmDeltBosted?.svarid === ESvar.NEI;

  if (
    harIkkeAvtaleOmDeltBosted &&
    harForelderSamværMedBarn(forelder?.harAnnenForelderSamværMedBarn?.svarid)
  )
    return harValgtSvar(forelder?.harAnnenForelderSamværMedBarn?.verdi);
  else if (
    harIkkeAvtaleOmDeltBosted &&
    måBeskriveSamværet(
      forelder?.harDereSkriftligSamværsavtale?.svarid,
      forelder?.harAnnenForelderSamværMedBarn?.svarid
    )
  )
    return harValgtSvar(forelder?.hvordanPraktiseresSamværet?.verdi);
  else return true;
};
