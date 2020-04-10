import { ISpørsmål } from '../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../helpers/standardSvar';

export const barnetFødt: ISpørsmål = {
  søknadid: 'barnetFødt',
  tekstid: 'barnekort.spm.født',
  svaralternativer: JaNeiSvar,
};
