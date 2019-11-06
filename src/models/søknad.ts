export interface ISøknad {
  fnr: string;
  fornavn: string;
  etternavn: string;
  statsborgerskap: string;
  adresse: string;
  telefonnr?: string;
  søkerOppholderSegINorge?: boolean;
  søkerBosattINorgeSisteTreÅr?: boolean;
  søkerErFlyktning?: boolean;
}
