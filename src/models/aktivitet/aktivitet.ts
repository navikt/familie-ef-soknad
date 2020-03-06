import { ITekstListeFelt, ITekstFelt } from '../søknadsfelter';
import { IUnderUtdanning } from './utdanning';
import { IArbeidsgiver } from './arbeidsgiver';
import { IArbeidssøker } from './arbeidssøker';
import { IFirma } from './firma';

export interface IAktivitet {
  hvaErDinArbeidssituasjon: ITekstListeFelt;
  etablererEgenVirksomhet?: ITekstFelt;
  arbeidsforhold?: IArbeidsgiver[];
  arbeidssøker?: IArbeidssøker;
  firma?: IFirma;
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
