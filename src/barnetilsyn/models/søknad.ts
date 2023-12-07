import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
} from '../../models/søknad/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/steg/dokumentasjon';
import { IAktivitet } from '../../models/steg/aktivitet/aktivitet';
import { IPerson, IPersonTilGjenbruk } from '../../models/søknad/person';
import { IAdresseopplysninger } from '../../models/steg/adresseopplysninger';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  aktivitet: IAktivitet;
  søkerFraBestemtMåned?: ISpørsmålBooleanFelt;
  adresseopplysninger?: IAdresseopplysninger;
  søknadsdato?: IDatoFelt;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}

export interface ForrigeSøknad {
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bositusjon: IBosituasjon;
  person: IPersonTilGjenbruk;
}
