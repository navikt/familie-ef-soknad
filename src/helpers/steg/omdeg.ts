import {
  EBegrunnelse,
  ESivilstand,
  ISivilstatus,
} from '../../models/steg/omDeg/sivilstatus';
import { IPeriode } from '../../models/felles/periode';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { harFyltUtSamboerDetaljer } from '../../utils/person';
import { DatoBegrensning } from '../../components/dato/Datovelger';
import { erDatoGyldigOgInnaforBegrensninger } from '../../components/dato/utils';
import {IDatoFelt} from "../../models/søknad/søknadsfelter";

export const hentSivilstatus = (statuskode?: string) => {
  switch (statuskode) {
    case ESivilstand.UOPPGITT:
    case ESivilstand.UGIFT:
    case ESivilstand.GIFT:
    case ESivilstand.ENKE_ELLER_ENKEMANN:
    case ESivilstand.SKILT:
    case ESivilstand.SEPARERT:
    case ESivilstand.REGISTRERT_PARTNER:
    case ESivilstand.SEPARERT_PARTNER:
    case ESivilstand.SKILT_PARTNER:
    case ESivilstand.GJENLEVENDE_PARTNER:
      return `sivilstatus.kode.${statuskode}`;
    //TPS
    //case ESivilstand.GIFT:
    case ESivilstand.REPA:
    case ESivilstand.UGIF:
    case ESivilstand.SAMB:
    case ESivilstand.SEPA:
    case ESivilstand.SEPR:
    case ESivilstand.SKIL:
    case ESivilstand.GJPA:
    case ESivilstand.ENKE:
      return `sivilstatus.kode.${statuskode}`;

    default:
      return 'Annen sivilstatus enn GIFT, UGIF, SAMB, SEPA, SKIL, SEPR';
  }
};

export const erSøknadsBegrunnelseBesvart = (sivilstatus: ISivilstatus) => {
  const {
    datoForSamlivsbrudd,
    datoFlyttetFraHverandre,
    datoEndretSamvær,
    årsakEnslig,
    tidligereSamboerDetaljer,
  } = sivilstatus;

  const valgtBegrunnelse = årsakEnslig?.svarid;

  switch (valgtBegrunnelse) {
    case EBegrunnelse.samlivsbruddForeldre:
      return (
        datoForSamlivsbrudd?.verdi !== undefined &&
        erDatoGyldigOgInnaforBegrensninger(
          datoForSamlivsbrudd.verdi,
          DatoBegrensning.TidligereDatoer
        )
      );
    case EBegrunnelse.samlivsbruddAndre:
      return (
        tidligereSamboerDetaljer &&
        harFyltUtSamboerDetaljer(tidligereSamboerDetaljer, false) &&
        datoFlyttetFraHverandre?.verdi !== undefined &&
        erDatoGyldigOgInnaforBegrensninger(
          datoFlyttetFraHverandre.verdi,
          DatoBegrensning.AlleDatoer
        )
      );
    case EBegrunnelse.endringISamværsordning:
      return (
        datoEndretSamvær?.verdi !== undefined &&
        erDatoGyldigOgInnaforBegrensninger(
          datoEndretSamvær?.verdi,
          DatoBegrensning.AlleDatoer
        )
      );
    case EBegrunnelse.aleneFraFødsel:
      return true;
    case EBegrunnelse.dødsfall:
      return true;
  }
};

export const erPeriodeDatoerValgt = (periode: IPeriode) => {
  const fom = periode.fra.verdi && periode.fra.verdi !== '';
  const tom = periode.til.verdi && periode.til.verdi !== '';
  return fom && tom;
};

const erMedlemskapSpørsmålBesvart = (medlemskap: IMedlemskap): boolean => {
  const { søkerBosattINorgeSisteTreÅr, perioderBoddIUtlandet } = medlemskap;

  if (perioderBoddIUtlandet !== null) {
    const manglerNoenBegrunnelserForUtenlandsopphold =
      perioderBoddIUtlandet?.some(
        (utenlandsopphold) =>
          utenlandsopphold.begrunnelse.verdi === '' ||
          !utenlandsopphold.begrunnelse
      );
    return søkerBosattINorgeSisteTreÅr?.verdi === false
      ? manglerNoenBegrunnelserForUtenlandsopphold
        ? false
        : true
      : søkerBosattINorgeSisteTreÅr?.verdi
      ? true
      : false;
  } else return false;
};
const erDatoFlyttetFraHverandreGyldig = (
    datoFlyttetFraHverandre: IDatoFelt | undefined
): boolean => {
  return (
      !!(datoFlyttetFraHverandre && datoFlyttetFraHverandre?.verdi?.length > 0 &&
          erDatoGyldigOgInnaforBegrensninger(
              datoFlyttetFraHverandre?.verdi,
              DatoBegrensning.AlleDatoer
          ))
  );
};
const erDatoSøktSeparasjonGyldig = (datoSøktSeparasjon: IDatoFelt | undefined): boolean => {
  return !!(datoSøktSeparasjon?.verdi &&
      erDatoGyldigOgInnaforBegrensninger(
          datoSøktSeparasjon?.verdi,
          DatoBegrensning.TidligereDatoer
      ));
};



export const erStegFerdigUtfylt = (
  sivilstatus: ISivilstatus,
  medlemskap: IMedlemskap,
  søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring: boolean
): boolean => {
  const { harSøktSeparasjon, datoSøktSeparasjon, datoFlyttetFraHverandre, erUformeltSeparertEllerSkilt, erUformeltGift } =
    sivilstatus;
  const datoFlyttetfraHverandreErUtfyltOgGyldig = erDatoFlyttetFraHverandreGyldig(datoFlyttetFraHverandre)
  const datoSøktSeparasjonerUtfyltOgGyldig = erDatoSøktSeparasjonGyldig(datoSøktSeparasjon)
  const erSpørsmålOmUformeltGiftEllerSkiltUtfylt = erUformeltSeparertEllerSkilt?.verdi !== undefined || erUformeltGift?.verdi !== undefined
  const erSpørsmålOmSøktSeparasjonUtfylt = (harSøktSeparasjon?.verdi &&
          datoSøktSeparasjonerUtfyltOgGyldig &&
          datoFlyttetfraHverandreErUtfyltOgGyldig) ||
      harSøktSeparasjon?.verdi === false
  const erSpørsmålOmGrunnTilAleneMedBarnUtfylt = (erSpørsmålOmSøktSeparasjonUtfylt || erSøknadsBegrunnelseBesvart(sivilstatus))

  return !!(erSpørsmålOmUformeltGiftEllerSkiltUtfylt &&
      (søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring) &&
      erSpørsmålOmGrunnTilAleneMedBarnUtfylt &&
      erMedlemskapSpørsmålBesvart(medlemskap));
};
