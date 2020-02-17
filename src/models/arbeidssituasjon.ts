import {
  ITekstListeFelt,
  ITekstFelt,
  ITallFelt,
  IBooleanFelt,
  IDatoFelt,
} from './søknadsfelter';

export interface IArbeidssituasjon {
  situasjon: ITekstListeFelt;
  etablererEgenVirksomhet?: ITekstFelt;
  arbeidsforhold?: IArbeidsgiver[];
}

export interface IArbeidsgiver {
  navn?: ITekstFelt;
  arbeidsmengde?: ITallFelt;
  fastStilling?: IBooleanFelt;
  harSluttDato?: IBooleanFelt;
  sluttdato?: IDatoFelt;
}

export enum EArbeidssituasjonSvar {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erArbeidstaker = 'erArbeidstaker',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  erHverkenIArbeidUtdanningEllerArbeidssøker = 'erHverkenIArbeidUtdanningEllerArbeidssøker',
}
