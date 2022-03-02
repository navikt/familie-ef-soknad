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
        harFyltUtSamboerDetaljer(tidligereSamboerDetaljer, true) &&
        datoFlyttetFraHverandre?.verdi !== undefined &&
        erDatoGyldigOgInnaforBegrensninger(
          datoFlyttetFraHverandre.verdi,
          DatoBegrensning.TidligereDatoer
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
};

export const erStegFerdigUtfylt = (
  sivilstatus: ISivilstatus,
  medlemskap: IMedlemskap
): boolean => {
  const { harSøktSeparasjon, datoSøktSeparasjon, datoFlyttetFraHverandre } =
    sivilstatus;

  const datoFlyttetfraHverandreErUtfyltOgGyldig =
    datoFlyttetFraHverandre?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      datoFlyttetFraHverandre?.verdi,
      DatoBegrensning.TidligereDatoer
    );

  const datoSøktSeparasjonerUtfyltOgGyldig =
    datoSøktSeparasjon?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      datoSøktSeparasjon?.verdi,
      DatoBegrensning.TidligereDatoer
    );

  return ((harSøktSeparasjon?.verdi &&
    datoSøktSeparasjonerUtfyltOgGyldig &&
    datoFlyttetfraHverandreErUtfyltOgGyldig) ||
    harSøktSeparasjon?.verdi === false ||
    erSøknadsBegrunnelseBesvart(sivilstatus)) &&
    erMedlemskapSpørsmålBesvart(medlemskap)
    ? true
    : false;
};
