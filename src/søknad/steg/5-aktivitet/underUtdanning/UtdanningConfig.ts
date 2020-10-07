import { ISpørsmål, ITekst } from '../../../../models/felles/spørsmålogsvar';
import {
  EStudieandel,
  EUtdanning,
  EUtdanningsform,
} from '../../../../models/steg/aktivitet/utdanning';
import { IHjelpetekst } from '../../../../models/felles/hjelpetekst';
import { JaNeiSvar } from '../../../../helpers/svar';
import { IntlShape } from 'react-intl';

// ----- TEKSTER
export const utdanningDuKanFåStønadTil: IHjelpetekst = {
  åpneTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad',
  lukkeTekstid: '',
};

export const utdanningDuKanFåStønadTilSkolepenger: IHjelpetekst = {
  åpneTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad.skolepenger',
  lukkeTekstid: '',
};

export const tidligereUtdanningHjelpetekst: IHjelpetekst = {
  åpneTekstid: 'tidligereUtdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'tidligereUtdanning.lesmer-innhold.kanFåStønad',
  lukkeTekstid: '',
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

export const privatEllerOffentligSpm = (intl: IntlShape): ISpørsmål => ({
  søknadid: EUtdanning.offentligEllerPrivat,
  tekstid: 'utdanning.spm.privatEllerOffentlig',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'utdanning.lesmer-åpne.privatEllerOffentlig',
    lukkeTekstid: '',
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
export const heltidEllerDeltidSpm = (intl: IntlShape): ISpørsmål => ({
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

export const utdanningEtterGrunnskolenSpm = (intl: IntlShape): ISpørsmål => ({
  søknadid: EUtdanning.harTattUtdanningEtterGrunnskolen,
  tekstid: 'utdanning.spm.grunnskole',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'utdanning.lesmer-åpne.grunnskolen',
    innholdTekstid: 'utdanning.lesmer-innholde.grunnskolen',
    lukkeTekstid: '',
  },
  svaralternativer: JaNeiSvar(intl),
});
