import { IBooleanFelt, ITekstFelt } from '../../søknadsfelter';
import { IPeriode } from '../../søknad';

export interface IMedlemskap {
  søkerOppholderSegINorge?: IBooleanFelt;
  søkerBosattINorgeSisteTreÅr?: IBooleanFelt;
  perioderBoddIUtlandet?: IUtenlandsopphold[];
}

export interface IUtenlandsopphold {
  react_key: string;
  periode: IPeriode;
  begrunnelse: ITekstFelt;
}
