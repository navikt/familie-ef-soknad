import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import { JaNeiSvar, JaSvar, NeiSvar } from '../../../../helpers/svar';
import { ESøknad } from '../../../../models/søknad/søknad';
import { LokalIntlShape } from '../../../../language/typer';
import { EBosituasjon } from '../../../../models/steg/bosituasjon';
import { DokumentasjonsConfig } from '../../../DokumentasjonsConfig';
import { EOpplysningerOmAdresse } from '../../../../models/steg/opplysningerOmAdresse';

export const borDuPåDenneAdressen = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: ESøknad.søkerBorPåRegistrertAdresse,
  tekstid: 'personopplysninger.spm.riktigAdresse',
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});

export const harMeldtFlytteendringSpørsmål = (
  intl: LokalIntlShape
): ISpørsmål => ({
  søknadid: EOpplysningerOmAdresse.harMeldtFlytteendring,
  tekstid: 'personopplysninger.spm.meldtFlytteendring',
  lesmer: undefined,
  flersvar: false,
  svaralternativer: [
    {
      ...JaSvar(intl),
      alert_tekstid: '',
      dokumentasjonsbehov: DokumentasjonsConfig.MeldtFlytteendring,
    },
    NeiSvar(intl),
  ],
});
