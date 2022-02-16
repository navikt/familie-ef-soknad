export interface Toggles {
  [key: string]: boolean;
}

export enum ToggleName {
  feilsituasjon = 'familie.ef.soknad.feilsituasjon',
  slettFnrState = 'familie.ef.soknad.slett-ugyldig-fnr-fra-state',
}
