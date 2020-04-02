import { ESvar, ISvar } from '../models/spørsmålogsvar';

export const JaNeiSvar: ISvar[] = [
  { id: ESvar.JA, svar_tekstid: ESvar.JA },
  { id: ESvar.NEI, svar_tekstid: ESvar.NEI },
];

export const NeiSvar: ISvar = { id: ESvar.NEI, svar_tekstid: ESvar.NEI };
export const JaSvar: ISvar = { id: ESvar.JA, svar_tekstid: ESvar.JA };
