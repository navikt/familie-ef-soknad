import { DokumentasjonsConfig } from './DokumentasjonsConfig';
import {
  AktivitetDokumentasjon,
  BarnasBostedDokumentasjon,
  BarnDokumentasjon,
  BarnetilsynDokumentasjon,
  OmDegDokumentasjon,
  SituasjonDokumentasjon,
} from '../models/steg/dokumentasjon';

it('Skal ha like mange keys i dokumentasjonsconfig som vi har i enums', () => {
  const antallKeysIDokumentasjonsconfig = Object.keys(DokumentasjonsConfig)
    .length;

  const alleEnums: number = [
    Object.keys(SituasjonDokumentasjon).length,
    Object.keys(BarnetilsynDokumentasjon).length,
    Object.keys(AktivitetDokumentasjon).length,
    Object.keys(BarnasBostedDokumentasjon).length,
    Object.keys(BarnDokumentasjon).length,
    Object.keys(OmDegDokumentasjon).length,
  ].reduce((last: number, current: number) => {
    return last + current;
  }, 0);

  expect(antallKeysIDokumentasjonsconfig).toBe(alleEnums + 2); // TODO: Fiks denne
});
