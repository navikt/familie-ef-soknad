import { ISpørsmålBooleanFelt } from '../../models/søknad/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/steg/dokumentasjon';
import { IPerson } from '../../models/søknad/person';
import { IDetaljertUtdanning } from './detaljertUtdanning';
import { LocaleType } from '../../language/typer';

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
