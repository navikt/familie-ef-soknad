import { IDatoFelt, ITekstFelt, ITekstListeFelt } from '../../søknadsfelter';

export interface IDinSituasjon {
  gjelderDetteDeg: ITekstListeFelt;
  datoOppstartJobb?: IDatoFelt;
  datoOppstartUtdanning?: IDatoFelt;
  søknadsdato: IDatoFelt;
  sagtOppEllerRedusertStilling?: ITekstFelt;
  begrunnelseSagtOppEllerRedusertStilling?: ITekstFelt;
  datoSagtOppEllerRedusertStilling?: IDatoFelt;
}

export enum EDinSituasjon {
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
