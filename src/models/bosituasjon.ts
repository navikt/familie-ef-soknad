import { IBooleanFelt, IDatoFelt, ITekstFelt } from './søknadsfelter';
import { IPersonDetaljer } from './person';

export interface IBosituasjon {
  søkerDelerBoligMedAndreVoksne: ITekstFelt;
  søkerSkalGifteSegEllerBliSamboer?: IBooleanFelt;
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
