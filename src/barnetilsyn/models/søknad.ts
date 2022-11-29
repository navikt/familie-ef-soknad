import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
} from '../../models/søknad/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/steg/dokumentasjon';
import { IAktivitet } from '../../models/steg/aktivitet/aktivitet';
import { IPerson } from '../../models/søknad/person';
import { IOpplysningerOmAdresse } from '../../models/steg/opplysningerOmAdresse';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  aktivitet: IAktivitet;
  søkerFraBestemtMåned?: ISpørsmålBooleanFelt;
  opplysningerOmAdresse?: IOpplysningerOmAdresse;
  søknadsdato?: IDatoFelt;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}
