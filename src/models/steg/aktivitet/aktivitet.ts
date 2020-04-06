import { ISpørsmålListeFelt, ISpørsmålFelt } from '../../søknadsfelter';
import { IUnderUtdanning } from './utdanning';
import { IArbeidsgiver } from './arbeidsgiver';
import { IArbeidssøker } from './arbeidssøker';
import { IFirma } from './firma';

export interface IAktivitet {
  hvaErDinArbeidssituasjon: ISpørsmålListeFelt;
  etablererEgenVirksomhet?: ISpørsmålFelt;
  arbeidsforhold?: IArbeidsgiver[];
  arbeidssøker?: IArbeidssøker;
  firma?: IFirma;
  underUtdanning?: IUnderUtdanning;
}

export enum EArbeidssituasjon {
  hvaErDinArbeidssituasjon = 'hvaErDinArbeidssituasjon',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
}

export enum ArbeidssituasjonType {
  erHjemmeMedBarnUnderEttÅr = 'erHjemmeMedBarnUnderEttÅr',
  erArbeidstaker = 'erArbeidstaker',
  erSelvstendigNæringsdriveneEllerFrilanser = 'erSelvstendigNæringsdriveneEllerFrilanser',
  erAnsattIEgetAS = 'erAnsattIEgetAS',
  etablererEgenVirksomhet = 'etablererEgenVirksomhet',
  erArbeidssøker = 'erArbeidssøker',
  tarUtdanning = 'tarUtdanning',
  erHverkenIArbeidUtdanningEllerArbeidssøker = 'erHverkenIArbeidUtdanningEllerArbeidssøker',
}
