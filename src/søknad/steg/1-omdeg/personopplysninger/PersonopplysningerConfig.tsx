import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';

export const borDuPåDenneAdressen: ISpørsmål = {
  spørsmål_id: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  svaralternativer: JaNeiSvar,
};
