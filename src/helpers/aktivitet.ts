import { IPerson } from '../models/person';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { ArbeidssituasjonType } from '../models/steg/aktivitet/aktivitet';

export const hentAktivitetSpørsmål = (
  person: IPerson,
  aktivitetSpørsmål: ISpørsmål
): ISpørsmål => {
  const AktivitetSpørsmål: ISpørsmål = aktivitetSpørsmål;
  const harSøkerBarnUnderEttÅr: boolean = person.barn.some(
    (barn) => parseInt(barn.alder.verdi) < 1 || !barn.født
  );

  if (!harSøkerBarnUnderEttÅr) {
    const svarsalternativerMedFjernetAlternativ: ISvar[] = AktivitetSpørsmål.svaralternativer.filter(
      (svar) => svar.id !== ArbeidssituasjonType.erHjemmeMedBarnUnderEttÅr
    );
    return {
      ...AktivitetSpørsmål,
      svaralternativer: svarsalternativerMedFjernetAlternativ,
    };
  } else return AktivitetSpørsmål;
};
