import { IPerson } from '../../models/søknad/person';
import {
  EBegrunnelse,
  ISivilstatus,
} from '../../models/steg/omDeg/sivilstatus';
import { IPeriode } from '../../models/felles/periode';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';

export const hentSivilstatus = (statuskode?: string) => {
  switch (statuskode) {
    case 'REPA':
      return 'sivilstatus.kode.REPA';

    case 'GIFT':
      return 'sivilstatus.kode.GIFT';

    case 'UGIF':
      return 'sivilstatus.kode.UGIF';

    case 'SAMB':
      return 'sivilstatus.kode.SAMB';

    case 'SEPA':
      return 'sivilstatus.kode.SEPR';
    case 'SEPR':
      return 'sivilstatus.kode.SEPA';

    case 'SKIL':
      return 'sivilstatus.kode.SKIL';

    case 'GJPA':
      return 'sivilstatus.kode.GJPA';

    case 'ENKE':
      return 'sivilstatus.kode.ENKE';

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
  } = sivilstatus;

  const valgtBegrunnelse = årsakEnslig?.svarid;

  switch (valgtBegrunnelse) {
    case EBegrunnelse.samlivsbruddForeldre:
      return datoForSamlivsbrudd?.verdi !== undefined;
    case EBegrunnelse.samlivsbruddAndre:
      return datoFlyttetFraHverandre?.verdi !== undefined;
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
