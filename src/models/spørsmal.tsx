import { LocaleString } from './språk';

export interface ISpørsmål {
  sporsmal_id: number;
  tittel: LocaleString;
}

export interface ISvar {
  _id: string;
  goto: number;
  tekst: string;
  done?: boolean;
  done_complete?: boolean;
  checked?: boolean;
}
