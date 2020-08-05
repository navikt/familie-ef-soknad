import { ISøknad } from './søknad';

export interface IMellomlagretSkolepengerSøknad {
  søknad: ISøknad;
  modellVersjon: number;
  gjeldendeSteg: string;
}
