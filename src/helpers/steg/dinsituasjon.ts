import {
  DinSituasjonType,
  IDinSituasjon,
} from '../../models/steg/dinsituasjon/meromsituasjon';

export const erSituasjonSeksjonFerdigUtfylt = (
  svarid: string,
  dinSituasjon: IDinSituasjon
): boolean => {
  const { datoOppstartJobb, datoOppstartUtdanning } = dinSituasjon;

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
      return datoOppstartJobb?.verdi !== undefined;
    case DinSituasjonType.skalTaUtdanning:
      return datoOppstartUtdanning?.verdi !== undefined;

    default:
      return false;
  }
};
