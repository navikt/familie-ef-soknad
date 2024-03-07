export interface Toggles {
  [key: string]: boolean;
}

export enum ToggleName {
  feilsituasjon = 'familie.ef.soknad.feilsituasjon',
  leggTilNynorsk = 'familie.ef.soknad.nynorsk',
  validerBosituasjon = 'familie.ef.soknad.validerbosituasjon',
}
