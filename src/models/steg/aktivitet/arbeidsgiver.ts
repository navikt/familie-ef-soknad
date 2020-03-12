import { IBooleanFelt, IDatoFelt, ITekstFelt } from '../../søknadsfelter';

export interface IArbeidsgiver {
  react_key: string;
  navn?: ITekstFelt;
  arbeidsmengde?: ITekstFelt;
  fastStilling?: ITekstFelt;
  harSluttDato?: IBooleanFelt;
  sluttdato?: IDatoFelt;
}
export enum EArbeidsgiver {
  navn = 'navn',
  arbeidsmengde = 'arbeidsmengde',
  fastStilling = 'fastStilling',
  harSluttDato = 'harSluttDato',
  sluttdato = 'sluttdato',
}

export enum EStilling {
  fast = 'fast',
  midlertidig = 'midlertidig',
}
