import { JaNeiSvar } from '../../../../helpers/standardSvar';
import { ISpørsmål } from '../../../../models/spørsmålogsvar';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  svaralternativer: JaNeiSvar,
};
