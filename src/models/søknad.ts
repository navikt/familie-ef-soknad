import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { IMedlemskap, ISivilstatus } from './omDeg';
import { IBooleanFelt, IDatoFelt } from './søknadsfelter';
import { IBosituasjon } from './bosituasjon';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: IBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  vedleggsliste: IVedlegg[];
}

export interface IPeriode {
  fra: IDatoFelt;
  til: IDatoFelt;
}
