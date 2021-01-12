import { IPerson } from '../../models/søknad/person';
import {
  EBegrunnelse,
  ESivilstand,
  ISivilstatus,
} from '../../models/steg/omDeg/sivilstatus';
import { IPeriode } from '../../models/felles/periode';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { harFyltUtSamboerDetaljer } from '../../utils/person';

export const hentSivilstatus = (statuskode?: string) => {
  switch (statuskode) {
    case ESivilstand.UOPPGITT:
    case ESivilstand.UGIFT:
    case ESivilstand.GIFT:
    case ESivilstand.ENKE_ELLER_ENKEMANN:
    case ESivilstand.SKILT:
    case ESivilstand.SEPARERT:
    case ESivilstand.PARTNER:
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

export const hentSøkersTlfnr = (søker: IPerson): string => {
  const { kontakttelefon } = søker.søker;
  return kontakttelefon && kontakttelefon.trim() !== '' ? kontakttelefon : '';
};

export const harSøkerTlfnr = (søker: IPerson): boolean => {
  const telefonnr = hentSøkersTlfnr(søker).trim();
  return telefonnr !== '';
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
      return datoForSamlivsbrudd?.verdi !== undefined;
    case EBegrunnelse.samlivsbruddAndre:
      return (
        tidligereSamboerDetaljer &&
        harFyltUtSamboerDetaljer(tidligereSamboerDetaljer, true) &&
        datoFlyttetFraHverandre?.verdi !== undefined
      );
    case EBegrunnelse.endringISamværsordning:
      return datoEndretSamvær?.verdi !== undefined;
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

export const erStegFerdigUtfylt = (
  person: IPerson,
  sivilstatus: ISivilstatus,
  medlemskap: IMedlemskap
): boolean => {
  const { harSøktSeparasjon } = sivilstatus;
  const { søkerBosattINorgeSisteTreÅr, perioderBoddIUtlandet } = medlemskap;

  const manglerNoenBegrunnelserForUtenlandsopphold = perioderBoddIUtlandet?.some(
    (utenlandsopphold) =>
      utenlandsopphold.begrunnelse.verdi === '' || !utenlandsopphold.begrunnelse
  );

  const erMedlemskapSpørsmålBesvart =
    søkerBosattINorgeSisteTreÅr?.verdi === false
      ? manglerNoenBegrunnelserForUtenlandsopphold
        ? false
        : true
      : søkerBosattINorgeSisteTreÅr?.verdi
      ? true
      : false;

  return ((harSøkerTlfnr(person) && harSøktSeparasjon?.verdi) ||
    harSøktSeparasjon?.verdi === false ||
    erSøknadsBegrunnelseBesvart(sivilstatus)) &&
    erMedlemskapSpørsmålBesvart
    ? true
    : false;
};
