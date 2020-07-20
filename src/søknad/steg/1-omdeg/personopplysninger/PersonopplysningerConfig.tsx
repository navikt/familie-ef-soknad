import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';
import { ESøknad } from '../../../../models/søknad';

export const borDuPåDenneAdressen: ISpørsmål = {
  søknadid: ESøknad.søkerBorPåRegistrertAdresse,
  tekstid: 'personopplysninger.spm.riktigAdresse',
  lesmer: {
    åpneTekstid: 'personopplysninger.lesmer-åpne.riktigAdresse',
    lukkeTekstid: '',
    innholdTekstid: 'personopplysninger.lesmer-innhold.riktigAdresse',
  },
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
