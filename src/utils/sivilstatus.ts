import { ESivilstand } from '../models/steg/omDeg/sivilstatus';

export const erSøkerGift = (sivilstand?: string) =>
  sivilstand === ESivilstand.GIFT || sivilstand === ESivilstand.REPA;

export const erSøkerUgift = (sivilstand?: string) =>
  sivilstand === ESivilstand.UGIF ||
  sivilstand === null ||
  sivilstand === 'NULL';

export const erSøkerEnke = (sivilstand?: string) =>
  sivilstand === ESivilstand.ENKE || sivilstand === ESivilstand.GJPA;

export const erSøkerSeparert = (sivilstand?: string) =>
  sivilstand === ESivilstand.SEPA || sivilstand === ESivilstand.SEPR;

export const erSøkerSkilt = (sivilstand?: string) =>
  sivilstand === ESivilstand.SKIL || sivilstand === ESivilstand.SKPA;
