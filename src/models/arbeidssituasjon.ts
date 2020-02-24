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
  fastStilling?: ITekstFelt;
  harSluttDato?: IBooleanFelt;
  sluttdato?: IDatoFelt;
}

export const nyttTekstFelt: ITekstFelt = {
  label: '',
  verdi: '',
};

export const nyttTekstListeFelt: ITekstListeFelt = {
  label: '',
  verdi: [],
};

export enum EArbeidssituasjon {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erArbeidstaker = 'erArbeidstaker',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  erHverkenIArbeidUtdanningEllerArbeidssøker = 'erHverkenIArbeidUtdanningEllerArbeidssøker',
}

export enum EStilling {
  fast = 'fast',
  midlertidig = 'midlertidig',
}

export enum EArbeidsgiver {
  navn = 'navn',
  arbeidsmengde = 'arbeidsmengde',
  fastStilling = 'fastStilling',
  harSluttDato = 'harSluttDato',
  sluttdato = 'sluttdato',
}
