import {
  ISpørsmålListeFelt,
  ISpørsmålFelt,
  ITekstFelt,
} from '../../søknadsfelter';
import { IUnderUtdanning } from './utdanning';
import { IArbeidsgiver } from './arbeidsgiver';
import { IArbeidssøker } from './arbeidssøker';
import { IFirma } from './firma';

export interface IAktivitet {
  hvaErDinArbeidssituasjon: ISpørsmålListeFelt;
  etablererEgenVirksomhet?: ISpørsmålFelt;
  arbeidsforhold?: IArbeidsgiver[];
  arbeidssøker?: IArbeidssøker;
  egetAS?: IAksjeselskap[];
  firma?: IFirma;
  underUtdanning?: IUnderUtdanning;
}

export enum EArbeidssituasjon {
  hvaErDinArbeidssituasjon = 'hvaErDinArbeidssituasjon',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
}

export enum EAktivitet {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erArbeidstaker = 'erArbeidstaker',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  erHverkenIArbeidUtdanningEllerArbeidssøker = 'erHverkenIArbeidUtdanningEllerArbeidssøker',
}

export interface IAksjeselskap {
  id: string;
  navn?: ITekstFelt;
  arbeidsmengde?: ITekstFelt;
}

export enum EAksjeselskap {
  navn = 'navn',
  arbeidsmengde = 'arbeidsmengde',
}
