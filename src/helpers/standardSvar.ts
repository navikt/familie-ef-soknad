import { ESvar, ISvar } from '../models/spørsmålogsvar';

export const JaNeiSvar = [
  { nøkkel: ESvar.JA, svar_tekstid: ESvar.JA },
  { nøkkel: ESvar.NEI, svar_tekstid: ESvar.NEI },
];

export const NeiSvar: ISvar = { nøkkel: ESvar.NEI, svar_tekstid: ESvar.NEI };
export const JaSvar: ISvar = { nøkkel: ESvar.JA, svar_tekstid: ESvar.JA };
