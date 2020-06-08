import { IBooleanFelt, ISpørsmålFelt, ITekstFelt } from '../../søknadsfelter';
import { IPeriode } from '../../periode';

// --- INTERFACES

export interface IUtdanning {
  id: string;
  linjeKursGrad?: ITekstFelt;
  periode?: IPeriode;
}

export interface IUnderUtdanning extends IUtdanning {
  skoleUtdanningssted: ITekstFelt;
  offentligEllerPrivat?: ITekstFelt;
  heltidEllerDeltid?: ISpørsmålFelt;
  arbeidsmengde?: ITekstFelt;
  målMedUtdanning?: ITekstFelt;
  harTattUtdanningEtterGrunnskolen?: IBooleanFelt;
  tidligereUtdanning?: IUtdanning[];
}

// --- ENUMS

export enum EUtdanning {
  linjeKursGrad = 'linjeKursGrad',
  periode = 'periode',
  skoleUtdanningssted = 'skoleUtdanningssted',
  offentligEllerPrivat = 'offentligEllerPrivat',
  heltidEllerDeltid = 'heltidEllerDeltid',
  arbeidsmengde = 'arbeidsmengde',
  målMedUtdanning = 'målMedUtdanning',
  harTattUtdanningEtterGrunnskolen = 'harTattUtdanningEtterGrunnskolen',
  tidligereUtdanning = 'tidligereUtdanning',
}

export enum EUtdanningsform {
  privat = 'privat',
  offentlig = 'offentlig',
}

export enum EStudieandel {
  heltid = 'heltid',
  deltid = 'deltid',
}
