import { ISøknad } from './søknad';

export interface IMellomlagretOvergangsstønad {
  søknad: ISøknad;
  modellVersjon: number;
  gjeldendeSteg: string;
}
