export interface Toggles {
  [key: string]: boolean;
}

export enum ToggleName {
  vis_innsending = 'familie.ef.soknad.vis-innsending',
  send_søknad = 'familie.ef.soknad.send-soknad',
  feilsituasjon = 'familie.ef.soknad.feilsituasjon',
  mellomlagre_søknad = 'familie.ef.soknad.mellomlagre-overgangsstonad',
  send_barnetilsyn_søknad = 'familie.ef.soknad.api.send-barnetilsynsoknad',
  send_skolepenger_søknad = 'familie.ef.soknad.api.send-skolepengersoknad',
}
