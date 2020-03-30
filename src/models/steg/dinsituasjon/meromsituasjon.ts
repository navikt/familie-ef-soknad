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
  søknadsdato: IDatoFelt;
  sagtOppEllerRedusertStilling?: ISpørsmålFelt;
  begrunnelseSagtOppEllerRedusertStilling?: ITekstFelt;
  datoSagtOppEllerRedusertStilling?: IDatoFelt;
}

export enum ESituasjon {
  gjelderDetteDeg = 'gjelderDetteDeg',
  datoOppstartJobb = 'datoOppstartJobb',
  datoOppstartUtdanning = 'datoOppstartUtdanning',
  søknadsdato = 'søknadsdato',
  sagtOppEllerRedusertStilling = 'sagtOppEllerRedusertStilling',
  begrunnelseSagtOppEllerRedusertStilling = 'begrunnelseSagtOppEllerRedusertStilling',
  datoSagtOppEllerRedusertStilling = 'datoSagtOppEllerRedusertStilling',
}

export enum DinSituasjonType {
  erSyk = 'erSyk',
  harSyktBarn = 'harSyktBarn',
  harSøktBarnepassOgVenterEnnå = 'harSøktBarnepassOgVenterEnnå',
  harBarnMedSærligeBehov = 'harBarnMedSærligeBehov',
  harFåttJobbTilbud = 'harFåttJobbTilbud',
  skalTaUtdanning = 'skalTaUtdanning',
}

export enum ESagtOppEllerRedusertStilling {
  sagtOpp = 'sagtOpp',
  redusertStilling = 'redusertStilling',
  nei = 'nei',
}
