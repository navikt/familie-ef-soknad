import { LocaleString } from './sprak';

export interface ISporsmal {
  sporsmal_id: number;
  tittel: LocaleString;
}

export interface ISvar {
  _key: string;
  goto: number;
  tekst: string;
  done?: boolean;
}
