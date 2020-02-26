import { ITekstListeFelt, ITekstFelt, IDatoFelt } from './søknadsfelter';

export interface IArbeidssituasjon {
  situasjon: ITekstListeFelt;
  etablererEgenVirksomhet?: ITekstFelt;
  firma?: IFirma;
}

export interface IFirma {
  navn?: ITekstFelt;
  organisasjonsnummer?: ITekstFelt;
  etableringsdato?: IDatoFelt;
  arbeidsmengde?: ITekstFelt;
  arbeidsuke?: ITekstFelt;
}

export enum EFirma {
  navn = 'navn',
  organisasjonsnummer = 'organisasjonsnummer',
  arbeidsmengde = 'arbeidsmengde',
}

export enum EArbeidssituasjonSvar {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erIArbeid = 'erIArbeid',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  erHverkenIArbeidUtdanningEllerArbeidssøker = 'erHverkenIArbeidUtdanningEllerArbeidssøker',
}
