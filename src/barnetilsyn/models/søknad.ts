import { IPerson } from '../models/person';
import { IVedlegg } from '../../models/vedlegg';
import { ISpørsmålBooleanFelt } from '../../models/søknadsfelter';
import { IBosituasjon } from '../../models/steg/bosituasjon';
import { IDinSituasjon } from '../../models/steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from '../../models/steg/omDeg/sivilstatus';
import { IMedlemskap } from '../../models/steg/omDeg/medlemskap';
import { IDokumentasjon } from '../../models/dokumentasjon';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  merOmDinSituasjon: IDinSituasjon;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
}
