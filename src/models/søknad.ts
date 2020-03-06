import { IAktivitet } from './steg/aktivitet/aktivitet';
import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { IMedlemskap, ISivilstatus } from './steg/omDeg';
import { IBooleanFelt, IDatoFelt } from './søknadsfelter';
import { IBosituasjon } from './steg/bosituasjon';
import { IDinSituasjon } from './steg/meromsituasjon';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: IBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  merOmDinSituasjon: IDinSituasjon;
  aktivitet: IAktivitet;
  vedleggsliste: IVedlegg[];
}

export interface IPeriode {
  fra: IDatoFelt;
  til: IDatoFelt;
}
