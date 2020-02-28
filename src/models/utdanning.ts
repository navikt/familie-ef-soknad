import { IBooleanFelt, ITallFelt, ITekstFelt } from './søknadsfelter';
import { IPeriode } from './søknad';

// --- INTERFACES

export interface IUtdanning {
  linjeKursGrad: ITekstFelt;
  periode: IPeriode;
}

export interface IUnderUtdanning extends IUtdanning {
  skoleUtdanningssted?: ITekstFelt;
  offentligEllerPrivat?: ITekstFelt;
  arbeidsmengde?: ITallFelt;
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
  arbeidsmengde = 'arbeidsmengde',
  målMedUtdanning = 'målMedUtdanning',
  harTattUtdanningEtterGrunnskolen = 'harTattUtdanningEtterGrunnskolen',
  tidligereUtdanning = 'tidligereUtdanning',
}
