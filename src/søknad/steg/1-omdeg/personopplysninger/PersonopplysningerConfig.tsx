import { JaNeiSvar } from '../../../../helpers/standardSvar';
import { ISpørsmål } from '../../../../models/spørsmålogsvar';

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
