import { IAktivitet } from './steg/aktivitet/aktivitet';
import { IPerson } from './person';
import { IVedlegg } from './vedlegg';
import { ISpørsmålBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from './steg/bosituasjon';
import { IDinSituasjon } from './steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from './steg/omDeg/sivilstatus';
import { IMedlemskap } from './steg/omDeg/medlemskap';
import { IDokumentasjon } from './dokumentasjon';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  aktivitet: IAktivitet;
  merOmDinSituasjon: IDinSituasjon;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}
