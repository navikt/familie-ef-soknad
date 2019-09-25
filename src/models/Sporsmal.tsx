export interface ISporsmal {
  sporsmal_id: number;
  sporsmal_tekst: string;
  hjelpetekst_overskrift: string;
  hjelpetekst_innhold: string;
}

export interface ISvar {
  _key: string;
  goto: number;
  tekst: string;
  done?: boolean;
}
