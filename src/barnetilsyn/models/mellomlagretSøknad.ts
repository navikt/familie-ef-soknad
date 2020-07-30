import { ISøknad } from './søknad';

export interface IMellomlagretBarnetilsynSøknad {
  søknad: ISøknad;
  modellVersjon: number;
  gjeldendeSteg: string;
}
