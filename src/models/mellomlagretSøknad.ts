import { ISøknad } from './søknad';

export interface IMellomlagretOvergangsstønad {
  søknad: ISøknad;
  modellVersjon: number;
  personHash: string;
  gjeldendeSteg: string;
}
