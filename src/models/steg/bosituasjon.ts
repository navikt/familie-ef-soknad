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
