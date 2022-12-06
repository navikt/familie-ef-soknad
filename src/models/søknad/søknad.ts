import { IAktivitet } from '../steg/aktivitet/aktivitet';
import { IPerson } from './person';
import { ISpørsmålBooleanFelt } from './søknadsfelter';
import { IBosituasjon } from '../steg/bosituasjon';
import { IDinSituasjon } from '../steg/dinsituasjon/meromsituasjon';
import { ISivilstatus } from '../steg/omDeg/sivilstatus';
import { IMedlemskap } from '../steg/omDeg/medlemskap';
import { IDokumentasjon } from '../steg/dokumentasjon';
import { IAdresseopplysninger } from '../steg/adresseopplysninger';

export interface ISøknad {
  innsendingsdato?: Date;
  person: IPerson;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  adresseopplysninger?: IAdresseopplysninger;
  sivilstatus: ISivilstatus;
  medlemskap: IMedlemskap;
  bosituasjon: IBosituasjon;
  aktivitet: IAktivitet;
  merOmDinSituasjon: IDinSituasjon;
  dokumentasjonsbehov: IDokumentasjon[];
  harBekreftet: boolean;
  locale?: any;
  skalBehandlesINySaksbehandling?: boolean;
}

export enum ESøknad {
  søkerBorPåRegistrertAdresse = 'søkerBorPåRegistrertAdresse',
  årsakSøkerBorIkkePåRegistrertAdresse = 'årsakSøkerBorIkkePåRegistrertAdresse',
}

export interface LocationStateSøknad {
  kommerFraOppsummering?: boolean;
}
