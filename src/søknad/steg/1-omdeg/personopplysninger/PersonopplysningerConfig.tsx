import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
