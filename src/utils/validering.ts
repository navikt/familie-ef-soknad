export const datoRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

export enum ManglendeFelter {
  BOSITUASJONEN_DIN = 'BOSITUASJONEN_DIN',
  OM_DEG = 'OM_DEG',
  MER_OM_DIN_SITUASJON = 'MER_OM_DIN_SITUASJON',
}

export const manglendeFelterTilTekst: Record<ManglendeFelter, string> = {
  BOSITUASJONEN_DIN: 'Bosituasjonen din',
  OM_DEG: 'Om deg',
  MER_OM_DIN_SITUASJON: 'Mer om din situasjon',
};
