import { ISpørsmålOgJaNeiSvar, ISpørsmålOgMultiSvar } from './søknad';
import { IPersonDetaljer } from './person';

export interface IBosituasjon {
  harSamværMedBarn: ISpørsmålOgMultiSvar;
}

export enum EHarSamværMedBarn {
  jaKonkreteTidspunkt = 'jaKonkreteTidspunkt',
  jaIkkeKonkreteTidspunkt = 'jaIkkeKonkreteTidspunkt',
  nei = 'nei',
}
