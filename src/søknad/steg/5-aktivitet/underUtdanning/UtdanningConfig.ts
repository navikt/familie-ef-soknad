import { ISpørsmål, ITekst } from '../../../../models/spørsmålogsvar';
import {
  EStudieandel,
  EUtdanning,
  EUtdanningsform,
} from '../../../../models/steg/aktivitet/utdanning';
import { IHjelpetekst } from '../../../../models/hjelpetekst';
import { JaNeiSvar } from '../../../../helpers/svar';

export const utdanningDuKanFåStønadTil: IHjelpetekst = {
  åpneTekstid: 'utdanning.lesmer-åpne.kanFåStønad',
  innholdTekstid: 'utdanning.lesmer-innhold.kanFåStønad',
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

// -- Spørsmål

export const privatEllerOffentligSpm: ISpørsmål = {
  søknadid: EUtdanning.offentligEllerPrivat,
  tekstid: 'utdanning.spm.privatEllerOffentlig',
  svaralternativer: [
    {
      id: EUtdanningsform.offentlig,
      svar_tekstid: 'utdanning.svar.offentlig',
    },
    {
      id: EUtdanningsform.privat,
      svar_tekstid: 'utdanning.svar.privat',
    },
  ],
};
export const heltidEllerDeltidSpm: ISpørsmål = {
  søknadid: EUtdanning.heltidEllerDeltid,
  tekstid: 'utdanning.spm.studieandel',
  svaralternativer: [
    {
      id: EStudieandel.heltid,
      svar_tekstid: 'utdanning.svar.heltid',
    },
    {
      id: EStudieandel.deltid,
      svar_tekstid: 'utdanning.svar.deltid',
    },
  ],
};

export const utdanningEtterGrunnskolenSpm: ISpørsmål = {
  søknadid: EUtdanning.harTattUtdanningEtterGrunnskolen,
  tekstid: 'utdanning.spm.grunnskole',
  svaralternativer: JaNeiSvar,
};
