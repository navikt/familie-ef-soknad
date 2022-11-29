import { ISpørsmålBooleanFelt } from '../søknad/søknadsfelter';

export interface IOpplysningerOmAdresse {
  harMeldtFlytteendring?: ISpørsmålBooleanFelt;
}

export enum EOpplysningerOmAdresse {
  harMeldtFlytteendring = 'harMeldtFlytteendring',
}
