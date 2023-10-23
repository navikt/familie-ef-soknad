export function harVerdi<T>(verdi: T | null | undefined): verdi is T {
  return verdi !== null && verdi !== undefined;
}

export type Seksjon = Blokk[];

interface InnholdBarn {
  href?: string;
  _type?: string;
  text?: string;
}

interface Innhold {
  _type: string;
  style: string;
  markDefs?: InnholdBarn[];
  children: InnholdBarn[];
  tittel?: string;
}

export interface Blokk {
  _type: string;
  innhold: Innhold[];
  tittel?: string;
}
