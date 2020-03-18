import { IVedlegg } from './vedlegg';

export interface IDokumentasjon {
  id: string;
  tittel: string;
  beskrivelse: string;
  harSendtInn: boolean;
  opplastedeVedlegg?: IVedlegg[];
}
