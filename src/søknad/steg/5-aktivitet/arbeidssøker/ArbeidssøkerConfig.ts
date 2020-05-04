import {
  ESvar,
  ESvarTekstid,
  ISpørsmål,
} from '../../../../models/spørsmålogsvar';
import {
  EArbeidssted,
  EArbeidssøker,
} from '../../../../models/steg/aktivitet/arbeidssøker';
import { JaNeiSvar, JaSvar } from '../../../../helpers/svar';

export const erSøkerArbeidssøker: ISpørsmål = {
  søknadid: EArbeidssøker.registrertSomArbeidssøkerNav,
  tekstid: 'arbeidssøker.label.registrert',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'arbeidssøker.hjelpetekst-åpne.registrert',
    innholdTekstid: 'arbeidssøker.hjelpetekst-innhold.registrert',
    lukkeTekstid: '',
  },
  svaralternativer: [
    JaSvar,
    {
      id: ESvar.NEI,
      svar_tekstid: ESvarTekstid.NEI,
      alert_tekstid: 'arbeidssøker.alert.forÅHaRett',
    },
  ],
};

export const erVilligTilÅTaImotTilbud: ISpørsmål = {
  søknadid: EArbeidssøker.villigTilÅTaImotTilbudOmArbeid,
  tekstid: 'arbeidssøker.label.villig',
  flersvar: false,
  svaralternativer: [
    JaSvar,
    {
      id: ESvar.NEI,
      svar_tekstid: ESvarTekstid.NEI,
      alert_tekstid: 'arbeidssøker.alert.villig',
    },
  ],
};

export const kanBegynneInnenEnUke: ISpørsmål = {
  søknadid: EArbeidssøker.kanBegynneInnenEnUke,
  tekstid: 'arbeidssøker.label.senestEnUke',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const kanSkaffeBarnepassInnenEnUke: ISpørsmål = {
  søknadid: EArbeidssøker.kanSkaffeBarnepassInnenEnUke,
  tekstid: 'arbeidssøker.label.barnepass',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const ønsketArbeidssted: ISpørsmål = {
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
      svar_tekstid: 'arbeidssøker.svar.nærme',
    },
    {
      id: EArbeidssted.hvorSomHelst,
      svar_tekstid: 'arbeidssøker.svar.hvorSomHelst',
    },
  ],
};

export const ønskerHalvStillig: ISpørsmål = {
  søknadid: EArbeidssøker.ønskerSøker50ProsentStilling,
  tekstid: 'arbeidssøker.label.halvstilling',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
