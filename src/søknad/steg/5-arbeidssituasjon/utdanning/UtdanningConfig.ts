import { ISpørsmål, ITekst, LesMer } from '../../../../models/spørsmal';
import {
  EStudieandel,
  EUtdanning,
  EUtdanningsform,
} from '../../../../models/arbeidssituasjon/utdanning';

export const utdanningDuKanFåStønadTil: LesMer = {
  åpneTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad',
  lukkeTekstid: '',
};

export const skoleUtdanningssted: ITekst = {
  nøkkel: EUtdanning.skoleUtdanningssted,
  label_tekstid: 'utdanning.label.skoleUtdanningssted',
};

export const linjeKursGrad: ITekst = {
  nøkkel: EUtdanning.linjeKursGrad,
  label_tekstid: 'utdanning.label.linjeKursGrad',
};

// --- Spørsmål ---
export const privatEllerOffentligSpm: ISpørsmål = {
  søknadid: EUtdanning.offentligEllerPrivat,
  tekstid: 'utdanning.spm.privatEllerOffentlig',
  svaralternativer: [
    {
      nøkkel: EUtdanningsform.offentlig,
      svar_tekstid: 'utdanning.svar.offentlig',
    },
    {
      nøkkel: EUtdanningsform.privat,
      svar_tekstid: 'utdanning.svar.privat',
    },
  ],
};
export const heltidEllerDeltidSpm: ISpørsmål = {
  søknadid: EUtdanning.heltidEllerDeltid,
  tekstid: 'utdanning.spm.studieandel',
  svaralternativer: [
    {
      nøkkel: EStudieandel.heltid,
      svar_tekstid: 'utdanning.svar.heltid',
    },
    {
      nøkkel: EStudieandel.deltid,
      svar_tekstid: 'utdanning.svar.deltid',
    },
  ],
};
