import { ITekstListeFelt } from '../søknadsfelter';

export interface IDinSituasjon {
  situasjon: ITekstListeFelt;
}

export enum EDinSituasjon {
  erSyk = 'erSyk',
  harSyktBarn = 'harSyktBarn',
  harSøktBarnepassOgVenterEnnå = 'harSøktBarnepassOgVenterEnnå',
  harBarnMedSærligeBehov = 'harBarnMedSærligeBehov',
  harFåttJobbTilbud = 'harFåttJobbTilbud',
  skalTaUtdanning = 'skalTaUtdanning',
}
