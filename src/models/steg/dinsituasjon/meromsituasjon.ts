import {
  IDatoFelt,
  ISpørsmålFelt,
  ISpørsmålListeFelt,
  ITekstFelt,
} from '../../søknadsfelter';

export interface IDinSituasjon {
  gjelderDetteDeg: ISpørsmålListeFelt;
  datoOppstartJobb?: IDatoFelt;
  datoOppstartUtdanning?: IDatoFelt;
  søknadsdato?: IDatoFelt;
  sagtOppEllerRedusertStilling?: ISpørsmålFelt;
  begrunnelseSagtOppEllerRedusertStilling?: ITekstFelt;
  datoSagtOppEllerRedusertStilling?: IDatoFelt;
  søkerFraBestemtMåned?: ISpørsmålFelt;
}

export enum ESituasjon {
  gjelderDetteDeg = 'gjelderDetteDeg',
  datoOppstartJobb = 'datoOppstartJobb',
  datoOppstartUtdanning = 'datoOppstartUtdanning',
  søknadsdato = 'søknadsdato',
  sagtOppEllerRedusertStilling = 'sagtOppEllerRedusertStilling',
  begrunnelseSagtOppEllerRedusertStilling = 'begrunnelseSagtOppEllerRedusertStilling',
  datoSagtOppEllerRedusertStilling = 'datoSagtOppEllerRedusertStilling',
  søkerFraBestemtMåned = 'søkerFraBestemtMåned',
}

export enum DinSituasjonType {
  erSyk = 'erSyk',
  harSyktBarn = 'harSyktBarn',
  harSøktBarnepassOgVenterEnnå = 'harSøktBarnepassOgVenterEnnå',
  harBarnMedSærligeBehov = 'harBarnMedSærligeBehov',
  nei = 'nei',
}

export enum ESagtOppEllerRedusertStilling {
  sagtOpp = 'sagtOpp',
  redusertStilling = 'redusertStilling',
  nei = 'nei',
}

export enum ESøkerFraBestemtMåned {
  ja = 'ja',
  neiNavKanVurdere = 'neiNavKanVurdere',
}
