import { IDatoFelt, ITekstListeFelt } from '../../søknadsfelter';

export interface IDinSituasjon {
  gjelderDetteDeg: ITekstListeFelt;
  utdanningStartsdato?: IDatoFelt;
  nyJobbStartsdato?: IDatoFelt;
}

export enum EDinSituasjon {
  erSyk = 'erSyk',
  harSyktBarn = 'harSyktBarn',
  harSøktBarnepassOgVenterEnnå = 'harSøktBarnepassOgVenterEnnå',
  harBarnMedSærligeBehov = 'harBarnMedSærligeBehov',
  harFåttJobbTilbud = 'harFåttJobbTilbud',
  skalTaUtdanning = 'skalTaUtdanning',
}
