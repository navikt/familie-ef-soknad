import { IKategori, ISpørsmål } from '../models/spørsmal';

export const SpørsmålOgSvar: ISpørsmål[] = [
  {
    spørsmål_id: 'søkerOppholderSegINorge',
    tekstid: 'medlemskap.spm.opphold',
    kategori: IKategori.Medlemskap,
    svaralternativer: [
      { value: 'ja', tekstid: 'svar.ja' },
      { value: 'nei', tekstid: 'svar.nei' },
    ],
  },
  {
    spørsmål_id: 'søkerBosattINorgeSisteTreÅr',
    tekstid: 'medlemskap.spm.bosatt',
    kategori: IKategori.Medlemskap,
    svaralternativer: [
      { value: 'ja', tekstid: 'svar.ja' },
      { value: 'nei', tekstid: 'svar.nei' },
    ],
  },
  {
    spørsmål_id: 'søkerErFlyktning',
    tekstid: 'medlemskap.spm.flyktning',
    kategori: IKategori.Medlemskap,
    svaralternativer: [
      { value: 'ja', tekstid: 'svar.ja' },
      { value: 'nei', tekstid: 'svar.nei' },
    ],
  },
];
