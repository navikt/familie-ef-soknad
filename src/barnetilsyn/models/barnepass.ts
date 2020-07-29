import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from '../../models/søknadsfelter';
import { IPeriode } from '../../models/periode';

export interface IBarnepass {
  årsakBarnepass?: ISpørsmålFelt;
  barnepassOrdninger?: IBarnepassOrdning[];
  søkerFraBestemtMåned?: ISpørsmålBooleanFelt;
  søknadsdato?: IDatoFelt;
}

export interface IBarnepassOrdning {
  hvaSlagsBarnepassOrdning?: ISpørsmålFelt;
  navn?: ISpørsmålFelt;
  periode?: IPeriode;
  belop?: ITekstFelt;
}

export enum EBarnepass {
  hvaSlagsBarnepassOrdning = 'hvaSlagsBarnepassOrdning',
  navn = 'navn',
  periode = 'periode',
  belop = 'belop',
  søkerFraBestemtMåned = 'søkerFraBestemtMåned',
}
