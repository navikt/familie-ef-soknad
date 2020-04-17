import { ISpørsmålBooleanFelt, ITekstFelt } from '../../søknadsfelter';

export interface IArbeidssøker {
  registrertSomArbeidssøkerNav?: ISpørsmålBooleanFelt;
  villigTilÅTaImotTilbudOmArbeid?: ISpørsmålBooleanFelt;
  kanBegynneInnenEnUke?: ISpørsmålBooleanFelt;
  kanSkaffeBarnepassInnenEnUke?: ISpørsmålBooleanFelt;
  hvorØnskerSøkerArbeid?: ITekstFelt;
  ønskerSøker50ProsentStilling?: ISpørsmålBooleanFelt;
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
