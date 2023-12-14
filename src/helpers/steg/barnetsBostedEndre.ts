import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { erGyldigDato } from '../../utils/dato';
import { IBarn } from '../../models/steg/barn';
import { TypeBarn } from '../../models/steg/barnasbosted';
import { IForelder } from '../../models/steg/forelder';
import { harValgtSvar } from '../../utils/spørsmålogsvar';

export const erIdentUtfyltOgGyldig = (ident?: string): boolean =>
  !!ident && erGyldigFødselsnummer(ident);

export const erFødselsdatoUtfyltOgGyldigEllerTomtFelt = (
  fødselsdato?: string
) => erGyldigDato(fødselsdato) || fødselsdato === '';

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

  const unikeForeldreIDer = Array.from(
    new Set(andreBarnMedForelder.map((b) => b.forelder?.id))
  );

  return unikeForeldreIDer
    .map((id) => {
      if (!id) return null;
      return andreBarnMedForelder.find((b) => b.forelder?.id === id);
    })
    .filter(Boolean) as IBarn[];
};

export const finnVisOmAndreForelder = (
  barn: IBarn,
  førsteBarnTilHverForelder: IBarn[],
  lagtTilAnnenForelderId: 'annen-forelder',
  barnHarSammeForelder: boolean | undefined,
  forelder: IForelder
) => {
  return (
    (!barn.medforelder?.verdi && førsteBarnTilHverForelder.length === 0) ||
    barn.annenForelderId === lagtTilAnnenForelderId ||
    (førsteBarnTilHverForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)))
  );
};
