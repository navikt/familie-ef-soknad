import { ITekstListeFelt, ITekstFelt } from '../søknadsfelter';
import { IUnderUtdanning } from './utdanning';
import { IArbeidsgiver } from './arbeidsgiver';
import { IArbeidssøker } from './arbeidssøker';

export interface IArbeidssituasjon {
  situasjon: ITekstListeFelt;
  etablererEgenVirksomhet?: ITekstFelt;
  arbeidsforhold?: IArbeidsgiver[];
  arbeidssøker?: IArbeidssøker;
  underUtdanning?: IUnderUtdanning;
}

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
