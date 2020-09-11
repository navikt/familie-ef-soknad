import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import {
  EArbeidssted,
  EArbeidssøker,
} from '../../../../models/steg/aktivitet/arbeidssøker';
import { JaNeiSvar, JaSvar, NeiSvar } from '../../../../helpers/svar';
import { DokumentasjonIkkeVilligTilArbeid } from '../AktivitetConfig';
import { IntlShape } from 'react-intl';

export const erSøkerArbeidssøker = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.registrertSomArbeidssøkerNav,
  tekstid: 'arbeidssøker.label.registrert',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'arbeidssøker.hjelpetekst-åpne.registrert',
    innholdTekstid: 'arbeidssøker.hjelpetekst-innhold.registrert',
    lukkeTekstid: '',
  },
  svaralternativer: [
    JaSvar(intl),
    { ...NeiSvar(intl), alert_tekstid: 'arbeidssøker.søknad.alert.forÅHaRett' },
  ],
});

export const erVilligTilÅTaImotTilbud = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.villigTilÅTaImotTilbudOmArbeid,
  tekstid: 'arbeidssøker.label.villig',
  flersvar: false,
  svaralternativer: [
    JaSvar(intl),
    {
      ...NeiSvar(intl),
      alert_tekstid: 'arbeidssøker.alert.villig',
      dokumentasjonsbehov: DokumentasjonIkkeVilligTilArbeid,
    },
  ],
});

export const kanBegynneInnenEnUke = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.kanBegynneInnenEnUke,
  tekstid: 'arbeidssøker.label.senestEnUke',
  flersvar: false,
  lesmer: {
    åpneTekstid: '',
    innholdTekstid: 'arbeidssøker.hjelpetekst-innhold.kanBegynneInnenEnUke',
    lukkeTekstid: '',
  },
  svaralternativer: JaNeiSvar(intl),
});

//TODO HVOR BRUKES DENNE?
export const kanSkaffeBarnepassInnenEnUke = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.kanSkaffeBarnepassInnenEnUke,
  tekstid: 'arbeidssøker.label.barnepass',
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});

export const ønsketArbeidssted = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.hvorØnskerSøkerArbeid,
  tekstid: 'arbeidssøker.label.ønsketArbeidssted',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'arbeidssøker.lesmer-åpne.ønsketArbeidssted',
    innholdTekstid: 'arbeidssøker.lesmer-innhold.ønsketArbeidssted',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: EArbeidssted.nærme,
      svar_tekst: intl.formatMessage({ id: 'arbeidssøker.svar.nærme' }),
    },
    {
      id: EArbeidssted.hvorSomHelst,
      svar_tekst: intl.formatMessage({ id: 'arbeidssøker.svar.hvorSomHelst' }),
    },
  ],
});

export const ønskerHalvStillig = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssøker.ønskerSøker50ProsentStilling,
  tekstid: 'arbeidssøker.label.halvstilling',
  flersvar: false,
  lesmer: {
    åpneTekstid: '',
    innholdTekstid: 'arbeidssøker.alert.halvstilling',
    lukkeTekstid: '',
  },
  svaralternativer: JaNeiSvar(intl),
});
