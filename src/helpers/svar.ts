import { ESvar, ESvarTekstid, ISvar } from '../models/spørsmålogsvar';

export const JaNeiSvar: ISvar[] = [
  { id: ESvar.JA, svar_tekstid: ESvarTekstid.JA },
  { id: ESvar.NEI, svar_tekstid: ESvarTekstid.NEI },
];

export const NeiSvar: ISvar = { id: ESvar.NEI, svar_tekstid: ESvarTekstid.NEI };
export const JaSvar: ISvar = { id: ESvar.JA, svar_tekstid: ESvarTekstid.JA };
