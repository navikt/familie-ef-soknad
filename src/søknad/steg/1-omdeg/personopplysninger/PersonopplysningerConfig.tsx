import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  svaralternativer: JaNeiSvar,
};
