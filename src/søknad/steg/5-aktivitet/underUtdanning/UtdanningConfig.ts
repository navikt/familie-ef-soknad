import { ISpørsmål, ITekst } from '../../../../models/felles/spørsmålogsvar';
import {
  EStudieandel,
  EUtdanning,
  EUtdanningsform,
} from '../../../../models/steg/aktivitet/utdanning';
import { IHjelpetekst } from '../../../../models/felles/hjelpetekst';
import { JaNeiSvar } from '../../../../helpers/svar';
import { LokalIntlShape } from '../../../../language/typer';

// ----- TEKSTER
export const utdanningDuKanFåStønadTil: IHjelpetekst = {
  headerTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad',
};

export const utdanningDuKanFåStønadTilSkolepenger: IHjelpetekst = {
  headerTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad.skolepenger',
};

export const tidligereUtdanningHjelpetekst: IHjelpetekst = {
  headerTekstid: 'tidligereUtdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'tidligereUtdanning.lesmer-innhold.kanFåStønad',
};

export const skoleUtdanningssted: ITekst = {
  id: EUtdanning.skoleUtdanningssted,
  label_tekstid: 'utdanning.label.skoleUtdanningssted',
};

export const linjeKursGrad: ITekst = {
  id: EUtdanning.linjeKursGrad,
  label_tekstid: 'utdanning.label.linjeKursGrad',
};

// --- Spørsmål

export const privatEllerOffentligSpm = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EUtdanning.offentligEllerPrivat,
  tekstid: 'utdanning.spm.privatEllerOffentlig',
  flersvar: false,
  lesmer: {
    headerTekstid: 'utdanning.lesmer-åpne.privatEllerOffentlig',
    innholdTekstid: 'utdanning.lesmer-innhold.privatEllerOffentlig',
  },
  svaralternativer: [
    {
      id: EUtdanningsform.offentlig,
      svar_tekst: intl.formatMessage({ id: 'utdanning.svar.offentlig' }),
    },
    {
      id: EUtdanningsform.privat,
      svar_tekst: intl.formatMessage({ id: 'utdanning.svar.privat' }),
    },
  ],
});
export const heltidEllerDeltidSpm = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EUtdanning.heltidEllerDeltid,
  tekstid: 'utdanning.spm.studieandel',
  flersvar: false,
  svaralternativer: [
    {
      id: EStudieandel.heltid,
      svar_tekst: intl.formatMessage({ id: 'utdanning.svar.heltid' }),
    },
    {
      id: EStudieandel.deltid,
      svar_tekst: intl.formatMessage({ id: 'utdanning.svar.deltid' }),
    },
  ],
});

export const utdanningEtterGrunnskolenSpm = (
  intl: LokalIntlShape
): ISpørsmål => ({
  søknadid: EUtdanning.harTattUtdanningEtterGrunnskolen,
  tekstid: 'utdanning.spm.grunnskole',
  flersvar: false,
  lesmer: {
    headerTekstid: 'utdanning.lesmer-åpne.grunnskolen',
    innholdTekstid: 'utdanning.lesmer-innholde.grunnskolen',
  },
  svaralternativer: JaNeiSvar(intl),
});
