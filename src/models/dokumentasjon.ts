import { IVedlegg } from './vedlegg';

export interface IDokumentasjon {
  id: string;
  spørsmålid: string;
  svarid: string;
  tittel: string;
  beskrivelse: string;
  harSendtInn: boolean;
  opplastedeVedlegg?: IVedlegg[];
}

export enum EDokumentasjon {
  INNGÅTT_EKTESKAP = 'INNGÅTT_EKTESKAP',
  SEPARASJON_ELLER_SKILSMISSE = 'SEPARASJON_ELLER_SKILSMISSE',
}
