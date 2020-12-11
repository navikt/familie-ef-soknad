import { ESivilstand } from '../models/steg/omDeg/sivilstatus';

export const erSøkerGift = (sivilstand?: string) =>
  sivilstand === ESivilstand.GIFT ||
  sivilstand === ESivilstand.REPA ||
  sivilstand === ESivilstand.PARTNER;

export const erSøkerUgift = (sivilstand?: string) =>
  sivilstand === ESivilstand.UGIF ||
  sivilstand === ESivilstand.UGIFT ||
  sivilstand === ESivilstand.UOPPGITT ||
  sivilstand === null ||
  sivilstand === 'NULL';

export const erSøkerEnke = (sivilstand?: string) =>
  sivilstand === ESivilstand.ENKE ||
  sivilstand === ESivilstand.GJPA ||
  sivilstand === ESivilstand.ENKE_ELLER_ENKEMANN ||
  sivilstand === ESivilstand.GJENLEVENDE_PARTNER;

export const erSøkerSeparert = (sivilstand?: string) =>
  sivilstand === ESivilstand.SEPA ||
  sivilstand === ESivilstand.SEPR ||
  sivilstand === ESivilstand.SEPARERT ||
  sivilstand === ESivilstand.SEPARERT_PARTNER;

export const erSøkerSkilt = (sivilstand?: string) =>
  sivilstand === ESivilstand.SKIL ||
  sivilstand === ESivilstand.SKPA ||
  sivilstand === ESivilstand.SKILT ||
  sivilstand === ESivilstand.SKILT_PARTNER;
