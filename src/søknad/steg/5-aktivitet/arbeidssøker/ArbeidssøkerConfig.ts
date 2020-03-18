import { ESvar, ISpørsmål } from '../../../../models/spørsmålogsvar';
import {
  EArbeidssted,
  EArbeidssøker,
} from '../../../../models/steg/aktivitet/arbeidssøker';
import { JaNeiSvar } from '../../../../helpers/standardSvar';

export const erSøkerArbeidssøker: ISpørsmål = {
  søknadid: EArbeidssøker.registrertSomArbeidssøkerNav,
  tekstid: 'arbeidssøker.label.registrert',
  svaralternativer: [
    { svar_tekstid: ESvar.JA },
    {
      svar_tekstid: ESvar.NEI,
      alert_tekstid: 'arbeidssøker.alert.forÅHaRett',
    },
  ],
};

export const erVilligTilÅTaImotTilbud: ISpørsmål = {
  søknadid: EArbeidssøker.villigTilÅTaImotTilbudOmArbeid,
  tekstid: 'arbeidssøker.label.villig',
  svaralternativer: JaNeiSvar,
};

export const kanBegynneInnenEnUke: ISpørsmål = {
  søknadid: EArbeidssøker.kanBegynneInnenEnUke,
  tekstid: 'arbeidssøker.label.senestEnUke',
  svaralternativer: JaNeiSvar,
};

export const kanSkaffeBarnepassInnenEnUke: ISpørsmål = {
  søknadid: EArbeidssøker.kanSkaffeBarnepassInnenEnUke,
  tekstid: 'arbeidssøker.label.barnepass',
  svaralternativer: JaNeiSvar,
};

export const ønsketArbeidssted: ISpørsmål = {
  søknadid: EArbeidssøker.hvorØnskerSøkerArbeid,
  tekstid: 'arbeidssøker.label.ønsketArbeidssted',
  lesmer: {
    åpneTekstid: 'arbeidssøker.lesmer-åpne.ønsketArbeidssted',
    innholdTekstid: 'arbeidssøker.lesmer-innhold.ønsketArbeidssted',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      nøkkel: EArbeidssted.nærme,
      svar_tekstid: 'arbeidssøker.svar.nærme',
    },
    {
      nøkkel: EArbeidssted.hvorSomHelst,
      svar_tekstid: 'arbeidssøker.svar.hvorSomHelst',
    },
  ],
};

export const ønskerHalvStillig: ISpørsmål = {
  søknadid: EArbeidssøker.ønskerSøker50ProsentStilling,
  tekstid: 'arbeidssøker.label.halvstilling',
  svaralternativer: JaNeiSvar,
};
