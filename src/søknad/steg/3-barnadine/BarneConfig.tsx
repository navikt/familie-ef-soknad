import { ISpørsmål } from '../../../models/spørsmalogsvar';
import { JaNeiSvar } from '../../../helpers/svar';

export const barnetFødt: ISpørsmål = {
  søknadid: 'barnetFødt',
  tekstid: 'barnekort.født',
  svaralternativer: JaNeiSvar,
};
