import { IBooleanFelt, ITekstFelt } from '../../søknadsfelter';
import { IPeriode } from '../../periode';

export interface IMedlemskap {
  søkerOppholderSegINorge?: IBooleanFelt;
  søkerBosattINorgeSisteTreÅr?: IBooleanFelt;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
}

export interface IUtenlandsopphold {
  id: string;
  periode: IPeriode;
  begrunnelse: ITekstFelt;
}
