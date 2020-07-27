import { IPerson } from '../models/person';
import { ISpørsmålBooleanFelt } from '../../models/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { IDinSituasjon } from '../../models/steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/dokumentasjon';
import { IAktivitet } from '../../models/steg/aktivitet/aktivitet';

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
