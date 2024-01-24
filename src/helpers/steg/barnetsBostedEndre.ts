import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { erGyldigDato } from '../../utils/dato';
import { IBarn } from '../../models/steg/barn';
import {
  EBorAnnenForelderISammeHus,
  TypeBarn,
} from '../../models/steg/barnasbosted';
import { IForelder } from '../../models/steg/forelder';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import { IDatoFelt, ITekstFelt } from '../../models/søknad/søknadsfelter';
import { stringErNullEllerTom } from '../../utils/typer';

export const erIdentUtfyltOgGyldig = (ident?: string): boolean =>
  !!ident && erGyldigFødselsnummer(ident);

export const erFødselsdatoUtfyltOgGyldigEllerTomtFelt = (
  fødselsdato?: string
) => erGyldigDato(fødselsdato) || stringErNullEllerTom(fødselsdato);

export const finnTypeBarnForMedForelder = (
  barn: IBarn,
  forelderidenterMedBarn: Map<string, IBarn[]>
) => {
  const alleBarnMedBarnetsForeldre = barn.forelder?.ident?.verdi
    ? forelderidenterMedBarn.get(barn.forelder?.ident?.verdi)
    : [];

  const harBarnetsMedforelderFlereBarn =
    !!alleBarnMedBarnetsForeldre && alleBarnMedBarnetsForeldre.length > 1;

  return harBarnetsMedforelderFlereBarn
    ? alleBarnMedBarnetsForeldre?.findIndex((b) => b.id === barn.id) === 0
      ? TypeBarn.BARN_MED_OPPRINNELIG_FORELDERINFORMASJON
      : TypeBarn.BARN_MED_KOPIERT_FORELDERINFORMASJON
    : TypeBarn.BARN_UTEN_FELLES_FORELDERINFORMASJON;
};

export const finnFørsteBarnTilHverForelder = (
  barneListe: IBarn[],
  barn: IBarn
) => {
  const andreBarnMedForelder: IBarn[] = barneListe.filter((b) => {
    return b !== barn && b.forelder;
  });
  console.log('andreBarnMedForelder', andreBarnMedForelder);
  const unikeForeldreIDer = Array.from(
    new Set(andreBarnMedForelder.map((b) => b.forelder?.id))
  );

  console.log('unikeForeldreIDer', unikeForeldreIDer);
  return unikeForeldreIDer
    .map((id) => {
      if (!id) return null;
      return andreBarnMedForelder.find((b) => b.forelder?.id === id);
    })
    .filter(Boolean) as IBarn[];
};

export const barnUtenForelderFraPDLOgIngenAndreForeldreDetKanKopieresFra = (
  barn: IBarn,
  førsteBarnTilHverForelder: IBarn[]
) => {
  return !barn.medforelder?.verdi && førsteBarnTilHverForelder.length === 0;
};

export const barnUtenForelderFraPdlOgErIkkeKopiert = (
  førsteBarnTilHverForelder: IBarn[],
  barnHarSammeForelder: boolean | undefined,
  barn: IBarn
) => {
  return (
    førsteBarnTilHverForelder.length > 0 &&
    barnHarSammeForelder !== true &&
    !barn.medforelder
  );
};

export const skalAnnenForelderRedigeres = (
  barn: IBarn,
  førsteBarnTilHverForelder: IBarn[],
  lagtTilAnnenForelderId: 'annen-forelder',
  barnHarSammeForelder: boolean | undefined,
  forelder: IForelder,
  finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn: boolean
) => {
  return (
    barnUtenForelderFraPDLOgIngenAndreForeldreDetKanKopieresFra(
      barn,
      førsteBarnTilHverForelder
    ) ||
    barn.annenForelderId === lagtTilAnnenForelderId ||
    barnUtenForelderFraPdlOgErIkkeKopiert(
      førsteBarnTilHverForelder,
      barnHarSammeForelder,
      barn
    ) ||
    (barn.erFraForrigeSøknad === false &&
      barnHarSammeForelder !== true &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi))) ||
    (finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn ===
      false &&
      !barn.medforelder)
  );
};

export const skalBorAnnenForelderINorgeVises = (
  barn: IBarn,
  typeBarn: TypeBarn,
  barnHarSammeForelder: boolean | undefined,
  forelder: IForelder,
  ident: ITekstFelt | undefined,
  fødselsdato: IDatoFelt | null | undefined,
  kjennerIkkeIdent: boolean
) => {
  return (
    (typeBarn !== TypeBarn.BARN_MED_KOPIERT_FORELDERINFORMASJON &&
      !!barn.medforelder?.verdi) ||
    (!barnHarSammeForelder &&
      !forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
      harValgtSvar(forelder?.navn?.verdi) &&
      (barn.erFraForrigeSøknad ||
        harValgtSvar(ident?.verdi || fødselsdato?.verdi) ||
        kjennerIkkeIdent))
  );
};

export const harValgtBorISammeHus = (forelder: IForelder) => {
  const { borAnnenForelderISammeHus } = forelder;
  return (
    (harValgtSvar(borAnnenForelderISammeHus?.verdi) &&
      borAnnenForelderISammeHus?.svarid !== EBorAnnenForelderISammeHus.ja) ||
    harValgtSvar(forelder.borAnnenForelderISammeHusBeskrivelse?.verdi)
  );
};
