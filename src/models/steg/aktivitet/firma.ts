import { IDatoFelt, ITekstFelt } from '../../søknad/søknadsfelter';

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
