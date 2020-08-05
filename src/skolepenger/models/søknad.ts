import { ISpørsmålBooleanFelt } from '../../models/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/dokumentasjon';
import { IPerson } from '../../models/person';
import { IDetaljertUtdanning } from './detaljertUtdanning';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  utdanning: IDetaljertUtdanning;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}
