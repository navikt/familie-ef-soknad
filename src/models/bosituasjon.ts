import { ISpørsmålOgJaNeiSvar, ISpørsmålOgMultiSvar } from './søknad';
import { IPersonDetaljer } from './person';

export interface IBosituasjon {
  søkerDelerBoligMedAndreVoksne: ISpørsmålOgMultiSvar;
  søkerSkalGifteSegEllerBliSamboer?: ISpørsmålOgJaNeiSvar;
  datoFlyttetSammenMedSamboer?: Date;
  datoSkalGifteSegEllerBliSamboer?: Date;
  samboerDetaljer?: IPersonDetaljer;
}

export enum ESøkerDelerBolig {
  borAleneMedBarnEllerGravid = 'borAleneMedBarnEllerGravid',
  borMidlertidigFraHverandre = 'borMidlertidigFraHverandre',
  borSammenOgVenterBarn = 'borSammenOgVenterBarn',
  harEkteskapsliknendeForhold = 'harEkteskapsliknendeForhold',
  delerBoligMedAndreVoksne = 'delerBoligMedAndreVoksne',
  tidligereSamboerFortsattRegistrertPåAdresse = 'tidligereSamboerFortsattRegistrertPåAdresse',
}
