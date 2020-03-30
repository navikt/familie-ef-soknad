import { IAktivitet } from './steg/aktivitet/aktivitet';
import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { IDatoFelt, ISpørsmålBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from './steg/bosituasjon';
import { IDinSituasjon } from './steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from './steg/omDeg/sivilstatus';
import { IMedlemskap } from './steg/omDeg/medlemskap';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  aktivitet: IAktivitet;
  merOmDinSituasjon: IDinSituasjon;
  vedleggsliste: IVedlegg[];
}

export interface IPeriode {
  fra: IDatoFelt;
  til: IDatoFelt;
}
