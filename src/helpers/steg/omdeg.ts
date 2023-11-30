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
import { IDatoFelt } from '../../models/søknad/søknadsfelter';
import {
  erSøkerEnke,
  erSøkerGift,
  erSøkerSeparert,
  erSøkerSkilt,
  erSøkerUgift,
} from '../../utils/sivilstatus';

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

export const erÅrsakEnsligBesvart = (sivilstatus: ISivilstatus) => {
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
    const finnesUtenlandsperiodeUtenBegrunnelse =
      perioderBoddIUtlandet?.some(
        (utenlandsopphold) =>
          utenlandsopphold.begrunnelse.verdi === '' ||
          !utenlandsopphold.begrunnelse
      );

    return søkerBosattINorgeSisteTreÅr?.verdi === false
      ? finnesUtenlandsperiodeUtenBegrunnelse
        ? false
        : true
      : søkerBosattINorgeSisteTreÅr?.verdi
      ? true
      : false;
  } else return false;
};

const erDatoSøktSeparasjonGyldig = (
  datoSøktSeparasjon: IDatoFelt | undefined
): boolean => {
  return !!(
    datoSøktSeparasjon?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      datoSøktSeparasjon?.verdi,
      DatoBegrensning.TidligereDatoer
    )
  );
};

const erSpørsmålOmUformeltGiftBesvart = (
  sivilstatus: ISivilstatus
): boolean => {
  return sivilstatus.erUformeltGift?.verdi !== undefined;
};

const erSpørsmålOmUformeltSeparertEllerSkiltBesvart = (
  sivilstatus: ISivilstatus
): boolean => {
  return sivilstatus.erUformeltSeparertEllerSkilt?.verdi !== undefined;
};

const erSpørsmålOmSøktSeparasjonUtfylt = (
  sivilstatus: ISivilstatus
): boolean => {
  const { harSøktSeparasjon, datoSøktSeparasjon } = sivilstatus;

  const datoSøktSeparasjonerUtfyltOgGyldig =
    erDatoSøktSeparasjonGyldig(datoSøktSeparasjon);

  return (
    (harSøktSeparasjon?.verdi && datoSøktSeparasjonerUtfyltOgGyldig) ||
    harSøktSeparasjon?.verdi === false
  );
};

export const erSivilstandSpørsmålBesvart = (
  sivilstand: string,
  sivilstatus: ISivilstatus
): boolean => {
  if (erSøkerUgift(sivilstand)) {
    return (
      erSpørsmålOmUformeltGiftBesvart(sivilstatus) &&
      erSpørsmålOmUformeltSeparertEllerSkiltBesvart(sivilstatus)
    );
  } else if (erSøkerSkilt(sivilstand)) {
    return erSpørsmålOmUformeltGiftBesvart(sivilstatus);
  } else if (erSøkerGift(sivilstand)) {
    return erSpørsmålOmSøktSeparasjonUtfylt(sivilstatus);
  } else if (erSøkerEnke(sivilstand) || erSøkerSeparert(sivilstand)) {
    return true;
  }

  return true;
};

export const erStegFerdigUtfylt = (
  sivilstatus: ISivilstatus,
  sivilstand: string,
  medlemskap: IMedlemskap,
  søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring: boolean
): boolean => {
  return !!(
    søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring &&
    erSivilstandSpørsmålBesvart(sivilstand, sivilstatus) &&
    erÅrsakEnsligBesvart(sivilstatus) &&
    erMedlemskapSpørsmålBesvart(medlemskap)
  );
};
