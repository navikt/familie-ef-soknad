import { ITekst, LesMer } from '../../../../models/spørsmal';
import { EUtdanning } from '../../../../models/utdanning';

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
