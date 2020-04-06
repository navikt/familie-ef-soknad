import { ISpørsmål } from '../../../../models/spørsmalogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  svaralternativer: JaNeiSvar,
};
