import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { IMedlemskap, ISivilstatus, IUtenlandsopphold } from './omDeg';
import { IBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from './bosituasjon';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: IBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
  bosituasjon: IBosituasjon;
  vedleggsliste: IVedlegg[];
}

export interface IPeriode {
  fra: Date;
  til: Date;
}
