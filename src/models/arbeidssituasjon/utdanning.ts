import { IBooleanFelt, ITallFelt, ITekstFelt } from '../søknadsfelter';
import { IPeriode } from '../søknad';

// --- INTERFACES

export interface IUtdanning {
  linjeKursGrad?: ITekstFelt;
  periode?: IPeriode;
}

export interface ITidligereUtdanning extends IUtdanning {
  tattUtdanningEtterGrunnskole?: IBooleanFelt;
}

export interface IUnderUtdanning extends IUtdanning {
  skoleUtdanningssted: ITekstFelt;
  offentligEllerPrivat?: ITekstFelt;
  heltidEllerDeltid?: ITekstFelt;
  arbeidsmengde?: ITallFelt;
  målMedUtdanning?: ITekstFelt;
  tidligereUtdanning?: ITidligereUtdanning[];
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
