import { IBooleanFelt, ITekstFelt } from '../../søknad/søknadsfelter';
import { IPeriode } from '../../felles/periode';

export interface IMedlemskap {
  søkerOppholderSegINorge?: IBooleanFelt;
  oppholdsland?: string;
  søkerBosattINorgeSisteTreÅr?: IBooleanFelt;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
}

export interface IUtenlandsopphold {
  id: string;
  periode: IPeriode;
  begrunnelse: ITekstFelt;
}

export enum EMedlemskap {
  søkerOppholderSegINorge = 'søkerOppholderSegINorge',
  oppholdsland = 'oppholdsland',
  søkerBosattINorgeSisteTreÅr = 'søkerBosattINorgeSisteTreÅr',
  perioderBoddIUtlandet = 'perioderBoddIUtlandet',
}
