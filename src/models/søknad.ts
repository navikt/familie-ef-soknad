import { IPerson } from './person';
import { IVedlegg } from './vedlegg';

export interface ISøknad {
  bekreftet?: boolean;
  person: IPerson;
  søkerOppholderSegINorge?: boolean;
  søkerBosattINorgeSisteTreÅr?: boolean;
  søkerErFlyktning?: boolean;
  søkerHarSøktSeparasjon?: boolean;
  datoSøktSeparasjon?: Date;
  søkerGiftIUtlandet?: boolean;
  søkerSeparertEllerSkiltIUtlandet?: boolean;
  vedleggsliste: IVedlegg[];
}
