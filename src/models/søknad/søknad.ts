import { IAktivitet } from '../steg/aktivitet/aktivitet';
import { IPerson } from './person';
import { ISpørsmålBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from '../steg/bosituasjon';
import { IDinSituasjon } from '../steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from '../steg/omDeg/sivilstatus';
import { IMedlemskap } from '../steg/omDeg/medlemskap';
import { IDokumentasjon } from '../steg/dokumentasjon';

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
  locale?: any;
}

export enum ESøknad {
  søkerBorPåRegistrertAdresse = 'søkerBorPåRegistrertAdresse',
}

export interface LocationStateSøknad {
  kommerFraOppsummering?: boolean;
}
