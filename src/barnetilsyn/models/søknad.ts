import { IPerson } from '../models/person';
import { IDatoFelt, ISpørsmålBooleanFelt } from '../../models/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
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
  søkerFraBestemtMåned?: ISpørsmålBooleanFelt;
  søknadsdato?: IDatoFelt;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}
