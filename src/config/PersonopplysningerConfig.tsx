import { IJaNeiSpørsmål, ISvar } from '../models/spørsmal';

export const borDuPåDenneAdressen: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  svaralternativer: [ISvar.JA, ISvar.NEI],
};
