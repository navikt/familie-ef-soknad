import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
} from '../søknadsfelter';
import { IPersonDetaljer } from '../person';

export interface IBosituasjon {
  delerBoligMedAndreVoksne: ISpørsmålFelt;
  skalGifteSegEllerBliSamboer?: ISpørsmålBooleanFelt;
  datoFlyttetSammenMedSamboer?: IDatoFelt;
  datoSkalGifteSegEllerBliSamboer?: IDatoFelt;
  datoFlyttetFraHverandre?: IDatoFelt;
  samboerDetaljer?: IPersonDetaljer;
}

export enum EBosituasjon {
  delerBoligMedAndreVoksne = 'delerBoligMedAndreVoksne',
  skalGifteSegEllerBliSamboer = 'skalGifteSegEllerBliSamboer',
  datoFlyttetSammenMedSamboer = 'datoFlyttetSammenMedSamboer',
  datoFlyttetFraHverandre = 'datoFlyttetFraHverandre',
  datoSkalGifteSegEllerBliSamboer = 'datoSkalGifteSegEllerBliSamboer',
  samboerDetaljer = 'samboerDetaljer',
}

export enum ESøkerDelerBolig {
  borAleneMedBarnEllerGravid = 'borAleneMedBarnEllerGravid',
  borMidlertidigFraHverandre = 'borMidlertidigFraHverandre',
  borSammenOgVenterBarn = 'borSammenOgVenterBarn',
  harEkteskapsliknendeForhold = 'harEkteskapsliknendeForhold',
  delerBoligMedAndreVoksne = 'delerBoligMedAndreVoksne',
  tidligereSamboerFortsattRegistrertPåAdresse = 'tidligereSamboerFortsattRegistrertPåAdresse',
}
