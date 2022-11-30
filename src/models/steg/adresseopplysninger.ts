import { ISpørsmålBooleanFelt } from '../søknad/søknadsfelter';

export interface IAdresseopplysninger {
  harMeldtFlytteendring?: ISpørsmålBooleanFelt;
}

export enum EAdresseopplysninger {
  harMeldtFlytteendring = 'harMeldtFlytteendring',
}
