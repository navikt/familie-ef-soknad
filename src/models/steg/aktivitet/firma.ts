import { IDatoFelt, ITekstFelt } from '../../søknad/søknadsfelter';

export interface IFirma {
  id: string;
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
