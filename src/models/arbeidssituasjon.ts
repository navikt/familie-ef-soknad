import {
  ITekstListeFelt,
  ITekstFelt,
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
  arbeidsmengde?: ITekstFelt;
  fastStilling?: IBooleanFelt;
  harSluttDato?: IBooleanFelt;
  sluttdato?: IDatoFelt;
}

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

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

export enum EStillingSvar {
  fast = 'fast',
  midlertidig = 'midlertidig',
}
