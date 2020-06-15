import {
  ISpørsmålListeFelt,
  ISpørsmålFelt,
  ITekstFelt,
  IDatoFelt,
} from '../../søknadsfelter';
import { IUnderUtdanning } from './utdanning';
import { IArbeidsgiver } from './arbeidsgiver';
import { IArbeidssøker } from './arbeidssøker';
import { IFirma } from './firma';

export interface IAktivitet {
  hvaErDinArbeidssituasjon: ISpørsmålListeFelt;
  etablererEgenVirksomhet?: ISpørsmålFelt;
  arbeidsforhold?: IArbeidsgiver[];
  datoOppstartJobb?: IDatoFelt;
  arbeidssøker?: IArbeidssøker;
  egetAS?: IAksjeselskap[];
  firma?: IFirma;
  underUtdanning?: IUnderUtdanning;
}

export enum EArbeidssituasjon {
  hvaErDinArbeidssituasjon = 'hvaErDinArbeidssituasjon',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  datoOppstartJobb = 'datoOppstartJobb',
}

export enum EAktivitet {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erArbeidstaker = 'erArbeidstaker',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  harFåttJobbTilbud = 'harFåttJobbTilbud',
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
