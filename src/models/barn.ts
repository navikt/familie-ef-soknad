import {
  IBooleanFelt,
  ISpørsmålBooleanFelt,
  ITekstFelt,
} from './søknadsfelter';
import { IForelder } from './forelder';

export interface IBarn {
  id: string;
  alder: ITekstFelt;
  fnr: ITekstFelt;
  fødselsdato: ITekstFelt;
  personnummer?: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  navn: ITekstFelt;
  født?: ISpørsmålBooleanFelt;
  lagtTil?: boolean;
  forelder?: IForelder;
}

export enum EBarn {
  alder = 'alder',
  fnr = 'fnr',
  fødselsdato = 'fødselsdato',
  personnummer = 'personnummer',
  harSammeAdresse = 'harSammeAdresse',
  navn = 'navn',
  født = 'født',
  skalBarnBoHosDeg = 'skalBarnBoHosDeg',
  forelder = 'forelder',
}
