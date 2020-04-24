import { IArbeidssøker } from '../../models/steg/aktivitet/arbeidssøker';

export interface ISkjema {
  fødselsnummer: string;
  arbeidssøker: IArbeidssøker;
}
