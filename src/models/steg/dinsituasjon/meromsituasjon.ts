import {
  IDatoFelt,
  ISpørsmålFelt,
  ISpørsmålListeFelt,
  ITekstFelt,
} from '../../søknadsfelter';

export interface IDinSituasjon {
  gjelderDetteDeg: ISpørsmålListeFelt;
  søknadsdato?: IDatoFelt;
  sagtOppEllerRedusertStilling?: ISpørsmålFelt;
  begrunnelseSagtOppEllerRedusertStilling?: ITekstFelt;
  datoSagtOppEllerRedusertStilling?: IDatoFelt;
  søkerFraBestemtMåned?: ISpørsmålFelt;
}

export enum ESituasjon {
  gjelderDetteDeg = 'gjelderDetteDeg',
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
