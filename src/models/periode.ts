import { IDatoFelt } from './søknadsfelter';

export interface IPeriode {
  label: string;
  fra: IDatoFelt;
  til: IDatoFelt;
}

export enum EPeriode {
  label = 'label',
  fra = 'fra',
  til = 'til',
}
