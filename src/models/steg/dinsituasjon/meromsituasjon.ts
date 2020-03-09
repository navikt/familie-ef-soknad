import { IDatoFelt, ITekstFelt, ITekstListeFelt } from '../../søknadsfelter';

export interface IDinSituasjon {
  gjelderDetteDeg: ITekstListeFelt;
  utdanningStartsdato?: IDatoFelt;
  nyJobbStartsdato?: IDatoFelt;
  søknadsdato: IDatoFelt;
  sagtOppEllerRedusertStilling?: ITekstFelt;
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
  jaHarSagtOppJobben = 'jaHarSagtOppJobben',
  jaHarRedusertArbeidstiden = 'jaHarRedusertArbeidstiden',
  nei = 'nei',
}
