import { ISpørsmålOgJaNeiSvar, ISpørsmålOgMultiSvar } from './søknad';
import { IPersonDetaljer } from './person';

export interface IBosituasjon {
  harSamværMedBarn: ISpørsmålOgMultiSvar;
}

export enum EHarSamværMedBarn {
  jaIkkeMerEnnVanlig = 'jaIkkeMerEnnVanlig',
  jaMerEnnVanlig = 'jaMerEnnVanlig',
  nei = 'nei',
}

export enum EHarSkriftligSamværsavtale {
  jaKonkreteTidspunkter = 'jaKonkreteTidspunkter',
  jaIkkeKonkreteTidspunkter = 'jaIkkeKonkreteTidspunkter',
  nei = 'nei',
}

export enum EBorISammeHus {
  ja = 'ja',
  nei = 'nei',
  vetikke = 'vetikke',
}

export enum EHvorMyeSammen {
  møtesIkke = 'møtesIkke',
  kunNårLeveres = 'kunNårLeveres',
  møtesUtenom = 'møtesUtenom',
}
