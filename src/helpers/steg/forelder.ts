import {
  EBorAnnenForelderISammeHus,
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EHvorforIkkeOppgi,
  EHvorMyeSammen,
} from '../../models/steg/barnasbosted';
import { EForelder, IForelder } from '../../models/steg/forelder';
import { ESvar, ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import { erDatoGyldigOgInnaforBegrensninger } from '../../components/dato/utils';
import { DatoBegrensning } from '../../components/dato/Datovelger';
import { harValgtBorISammeHusEllerBorIkkeINorge } from './barnetsBostedEndre';
import { stringHarVerdiOgErIkkeTom } from '../../utils/typer';

export const erAlleForeldreUtfylt = (foreldre: IForelder[]) =>
  foreldre.every((forelder) => erForelderUtfylt(forelder));

export const utfyltBorINorge = (forelder: IForelder) => {
  const { borINorge, land } = forelder;
  return (
    borINorge?.verdi === true ||
    (borINorge?.verdi === false && stringHarVerdiOgErIkkeTom(land?.verdi))
  );
};

export const erForelderUtfylt = (forelder: IForelder): boolean | undefined => {
  const { avtaleOmDeltBosted } = forelder;

  const utfyltAvtaleDeltBosted = harValgtSvar(avtaleOmDeltBosted?.verdi);

  const forelderInfoOgSpørsmålBesvart: boolean | undefined =
    utfyltBorINorge(forelder) &&
    utfyltAvtaleDeltBosted &&
    utfyltNødvendigeSamværSpørsmål(forelder) &&
    utfyltNødvendigBostedSpørsmål(forelder) &&
    harValgtBorISammeHusEllerBorIkkeINorge(forelder) &&
    visSpørsmålHvisIkkeSammeForelder(forelder);

  const kanIkkeOppgiAnnenForelderRuteUtfylt =
    utfyltNødvendigSpørsmålUtenOppgiAnnenForelder(forelder);

  return forelderInfoOgSpørsmålBesvart || kanIkkeOppgiAnnenForelderRuteUtfylt;
};

export const utfyltNødvendigSpørsmålUtenOppgiAnnenForelder = (
  forelder: IForelder
) => {
  const {
    hvorforIkkeOppgi,
    ikkeOppgittAnnenForelderBegrunnelse,
    kanIkkeOppgiAnnenForelderFar,
  } = forelder;

  const pgaDonorBarn = hvorforIkkeOppgi?.verdi === EHvorforIkkeOppgi.donor;
  const pgaAnnet =
    hvorforIkkeOppgi?.verdi === EHvorforIkkeOppgi.Annet &&
    harValgtSvar(forelder?.ikkeOppgittAnnenForelderBegrunnelse?.verdi) &&
    ikkeOppgittAnnenForelderBegrunnelse?.verdi !== hvorforIkkeOppgi?.verdi;
  return kanIkkeOppgiAnnenForelderFar?.verdi && (pgaDonorBarn || pgaAnnet);
};

export const utfyltNødvendigeSamværSpørsmål = (forelder: IForelder) => {
  const {
    avtaleOmDeltBosted,
    harAnnenForelderSamværMedBarn,
    harDereSkriftligSamværsavtale,
    hvordanPraktiseresSamværet,
  } = forelder;
  const harIkkeAvtaleOmDeltBosted = avtaleOmDeltBosted?.verdi === false;

  if (
    harIkkeAvtaleOmDeltBosted &&
    harForelderSamværMedBarn(harAnnenForelderSamværMedBarn?.svarid)
  )
    return harValgtSvar(harAnnenForelderSamværMedBarn?.verdi);
  else if (
    harIkkeAvtaleOmDeltBosted &&
    måBeskriveSamværet(
      harDereSkriftligSamværsavtale?.svarid,
      harAnnenForelderSamværMedBarn?.svarid
    )
  )
    return harValgtSvar(hvordanPraktiseresSamværet?.verdi);
  else return true;
};

export const utfyltNødvendigBostedSpørsmål = (forelder: IForelder) => {
  const utfyltBorISammeHus =
    forelder?.borINorge?.verdi &&
    forelder?.borAnnenForelderISammeHus?.svarid ===
      EBorAnnenForelderISammeHus.ja
      ? forelder?.borAnnenForelderISammeHusBeskrivelse?.verdi !== ''
      : true;

  const harFlyttetFraDato: boolean =
    forelder?.flyttetFra?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      forelder.flyttetFra?.verdi,
      DatoBegrensning.AlleDatoer
    )
      ? true
      : false;

  const utfyltBoddSammenFør =
    forelder?.boddSammenFør?.verdi === true
      ? harValgtSvar(forelder?.boddSammenFør?.verdi) && harFlyttetFraDato
      : harValgtSvar(forelder?.boddSammenFør?.verdi);

  const utfyltHvorMyeSammen =
    forelder?.hvorMyeSammen?.svarid === EHvorMyeSammen.møtesUtenom
      ? harValgtSvar(forelder.beskrivSamværUtenBarn?.verdi)
      : harValgtSvar(forelder?.hvorMyeSammen?.verdi);

  return utfyltBorISammeHus && utfyltBoddSammenFør && utfyltHvorMyeSammen;
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

export const måBeskriveSamværet = (
  samværsavtale: string | undefined,
  samværMedBarn: string | undefined
) => {
  return (
    samværMedBarn === EHarSamværMedBarn.jaMerEnnVanlig &&
    (samværsavtale === EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter ||
      samværsavtale === EHarSkriftligSamværsavtale.nei)
  );
};

export const visSpørsmålHvisIkkeSammeForelder = (forelder: IForelder) => {
  if (forelder.harAnnenForelderSamværMedBarn?.svarid === EHarSamværMedBarn.nei)
    return true;
  else if (
    forelder.hvordanPraktiseresSamværet &&
    forelder.hvordanPraktiseresSamværet?.verdi !== ''
  )
    return true;
  else if (forelder.harDereSkriftligSamværsavtale?.svarid)
    return !måBeskriveSamværet(
      forelder.harDereSkriftligSamværsavtale.svarid,
      forelder.harAnnenForelderSamværMedBarn?.svarid
    );

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

export const harSkriftligAvtaleOmDeltBosted = (
  spørsmål: ISpørsmål,
  svar: ISvar
) => {
  return (
    spørsmål.søknadid === EForelder.avtaleOmDeltBosted && svar.id === ESvar.JA
  );
};

export const slettIrrelevantPropertiesHvisHuketAvKanIkkeOppgiAnnenForelder = (
  nyForelder: IForelder
) => {
  delete nyForelder.navn;
  delete nyForelder.fødselsdato;
  delete nyForelder.ident;
  delete nyForelder.id;
  delete nyForelder.borAnnenForelderISammeHus;
  delete nyForelder.borAnnenForelderISammeHusBeskrivelse;
  delete nyForelder.harAnnenForelderSamværMedBarn;
  delete nyForelder.avtaleOmDeltBosted;
  delete nyForelder.borINorge;
  delete nyForelder.land;
  delete nyForelder.boddSammenFør;
  delete nyForelder.flyttetFra;
  delete nyForelder.hvorMyeSammen;
  delete nyForelder.beskrivSamværUtenBarn;
};
