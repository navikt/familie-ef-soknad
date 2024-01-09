export interface IMedforelder {
  alder?: number;
  død?: boolean;
  harAdressesperre: boolean;
  ident?: string;
  navn?: string;
}

export interface IMedforelderFelt {
  label: string;
  verdi: IMedforelder;
}

export interface IMedforelderPersonData {
  harAdressesperre: boolean;
  død: boolean;
  ident: string;
  navn: string;
  alder: number;
}
