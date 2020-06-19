import { IVedlegg } from './vedlegg';

export interface IDokumentasjon {
  id: string;
  spørsmålid: string;
  svarid: string;
  tittel: string;
  beskrivelse?: string;
  harSendtInn: boolean;
  opplastedeVedlegg?: IVedlegg[];
}

export enum OmDegDokumentasjon {
  SAMLIVSBRUDD = 'SAMLIVSBRUDD',
  INNGÅTT_EKTESKAP = 'INNGÅTT_EKTESKAP',
  SEPARASJON_ELLER_SKILSMISSE = 'SEPARASJON_ELLER_SKILSMISSE',
  UFORMELL_SEPARASJON_ELLER_SKILSMISSE = 'UFORMELL_SEPARASJON_ELLER_SKILSMISSE',
}

export enum BosituasjonDokumentasjon {
  BOR_PÅ_ULIKE_ADRESSER = 'BOR_PÅ_ULIKE_ADRESSER',
}

export enum BarnDokumentasjon {
  TERMINBEKREFTELSE = 'TERMINBEKREFTELSE',
}
export enum BarnasBostedDokumentasjon {
  BARN_BOR_HOS_SØKER = 'BARN_BOR_HOS_SØKER',
  DELT_BOSTED = 'DELT_BOSTED',
  SAMVÆRSAVTALE = 'SAMVÆRSAVTALE',
}

export enum AktivitetDokumentasjon {
  UTDANNING = 'UTDANNING',
  LÆRLING = 'LÆRLING',
}

export enum SituasjonDokumentasjon {
  IKKE_VILLIG_TIL_ARBEID = 'IKKE_VILLIG_TIL_ARBEID',
  SYKDOM = 'SYKDOM',
  SYKT_BARN = 'SYKT_BARN',
  BARNEPASS = 'BARNEPASS',
  BARNETILSYN_BEHOV = 'BARNETILSYN_BEHOV',
  ARBEIDSKONTRAKT = 'ARBEIDSKONTRAKT',
  ARBEIDSFORHOLD_OPPSIGELSE = 'ARBEIDSFORHOLD_OPPSIGELSE',
  ARBEIDSFORHOLD_REDUSERT_ARBEIDSTID = 'ARBEIDSFORHOLD_REDUSERT_ARBEIDSTID',
}
