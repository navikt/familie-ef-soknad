export interface IVedlegg {
  id: string;
  navn: string;
}

export interface IDokumentasjonsbehov {
  label: string;
  id: string;
  harSendtInn: boolean;
  opplastedeVedlegg: IVedlegg[];
}

export interface DokumentasjonsbehovResponse {
  dokumentasjonsbehov: IDokumentasjonsbehov[];
  innsendingstidspunkt: string;
  søknadType: SøknadType;
  personIdent: String;
}

export enum SøknadType {
  OVERGANGSSTØNAD = 'OVERGANGSSTØNAD',
  BARNETILSYN = 'BARNETILSYN',
  SKOLEPENGER = 'SKOLEPENGER',
}
