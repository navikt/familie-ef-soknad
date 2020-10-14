import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';
import { ESøknad } from '../../../../models/søknad/søknad';
import { IntlShape } from 'react-intl';

export const borDuPåDenneAdressen = (intl: IntlShape): ISpørsmål => ({
  søknadid: ESøknad.søkerBorPåRegistrertAdresse,
  tekstid: 'personopplysninger.spm.riktigAdresse',
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'personopplysninger.lesmer-innhold.riktigAdresse',
  },
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});
