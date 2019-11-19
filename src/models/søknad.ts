import { IPerson } from './person';

export interface ISøknad {
  person: IPerson;
  søkerOppholderSegINorge?: boolean;
  søkerBosattINorgeSisteTreÅr?: boolean;
  søkerErFlyktning?: boolean;
  harSøktSeparasjon?: boolean;
  datoSøktSeparasjon?: Date;
}
