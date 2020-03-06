import { IBooleanFelt, ITekstFelt } from '../../søknadsfelter';

export interface IArbeidssøker {
  registrertSomArbeidssøkerNav?: IBooleanFelt;
  villigTilÅTaImotTilbudOmArbeid?: IBooleanFelt;
  kanBegynneInnenEnUke?: IBooleanFelt;
  kanSkaffeBarnepassInnenEnUke?: IBooleanFelt;
  hvorØnskerSøkerArbeid?: ITekstFelt;
  ønskerSøker50ProsentStilling?: IBooleanFelt;
}

export enum EArbeidssøker {
  registrertSomArbeidssøkerNav = 'registrertSomArbeidssøkerNav',
  villigTilÅTaImotTilbudOmArbeid = 'villigTilÅTaImotTilbudOmArbeid',
  kanBegynneInnenEnUke = 'kanBegynneInnenEnUke',
  kanSkaffeBarnepassInnenEnUke = 'kanSkaffeBarnepassInnenEnUke',
  hvorØnskerSøkerArbeid = 'hvorØnskerSøkerArbeid',
  ønskerSøker50ProsentStilling = 'ønskerSøker50ProsentStilling',
}

export enum EArbeidssted {
  nærme = 'nærme',
  hvorSomHelst = 'hvorSomHelst',
}
