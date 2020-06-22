import { IDatoFelt } from './søknadsfelter';

export interface IPeriode {
  fra: IDatoFelt;
  til: IDatoFelt;
}

export enum EPeriode {
  fra = 'fra',
  til = 'til',
}
