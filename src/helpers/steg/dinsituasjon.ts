import {
  DinSituasjonType,
  IDinSituasjon,
} from '../../models/steg/dinsituasjon/meromsituasjon';

export const erSituasjonSeksjonFerdigUtfylt = (
  svarid: string,
  dinSituasjon: IDinSituasjon
): boolean => {
  const {} = dinSituasjon;

  switch (svarid) {
    case DinSituasjonType.erSyk:
      return true;

    case DinSituasjonType.harSyktBarn:
      return true;

    case DinSituasjonType.harSøktBarnepassOgVenterEnnå:
      return true;
    case DinSituasjonType.harBarnMedSærligeBehov:
      return true;
    case DinSituasjonType.harFåttJobbTilbud:
      return true;
    case DinSituasjonType.skalTaUtdanning:
      return true;

    default:
      return false;
  }
};
