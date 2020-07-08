import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: 'søkerBorPåRegistrertAdresse',
  tekstid: 'personopplysninger.spm.riktigAdresse',
  lesmer: {
    åpneTekstid: 'personopplysninger.lesmer-åpne.riktigAdresse',
    lukkeTekstid: '',
    innholdTekstid: 'personopplysninger.lesmer-innhold.riktigAdresse',
  },
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
