import { IPerson } from '../models/person';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import {
  ArbeidssituasjonType,
  IAktivitet,
} from '../models/steg/aktivitet/aktivitet';

export const hentAktivitetSpørsmål = (
  person: IPerson,
  aktivitetSpørsmål: ISpørsmål
): ISpørsmål => {
  const AktivitetSpørsmål: ISpørsmål = aktivitetSpørsmål;
  const harSøkerBarnUnderEttÅr: boolean = person.barn.some(
    (barn) => !barn.født || parseInt(barn.alder.verdi) < 1
  );

  if (!harSøkerBarnUnderEttÅr) {
    const filtrerteSvaralternativer: ISvar[] = AktivitetSpørsmål.svaralternativer.filter(
      (svar) => svar.id !== ArbeidssituasjonType.erHjemmeMedBarnUnderEttÅr
    );
    return {
      ...AktivitetSpørsmål,
      svaralternativer: filtrerteSvaralternativer,
    };
  } else return AktivitetSpørsmål;
};

export const fjernArbeidssituasjonType = (
  svarider: string[],
  arbeidssituasjon: IAktivitet
) => {
  const endretArbeidssituasjon = arbeidssituasjon;

  const erSvarid = (arbeidssituasjonType: ArbeidssituasjonType) => {
    return svarider.find((svarid) => svarid === arbeidssituasjonType);
  };

  if (
    !erSvarid(ArbeidssituasjonType.erArbeidstaker) &&
    endretArbeidssituasjon.arbeidsforhold
  )
    delete endretArbeidssituasjon.arbeidsforhold;

  if (
    !erSvarid(ArbeidssituasjonType.erSelvstendigNæringsdriveneEllerFrilanser) &&
    endretArbeidssituasjon.firma
  )
    delete endretArbeidssituasjon.firma;
  if (
    !erSvarid(ArbeidssituasjonType.etablererEgenVirksomhet) &&
    endretArbeidssituasjon.etablererEgenVirksomhet
  )
    delete endretArbeidssituasjon.etablererEgenVirksomhet;

  if (
    !erSvarid(ArbeidssituasjonType.erAnsattIEgetAS) &&
    endretArbeidssituasjon.egetAS
  )
    delete endretArbeidssituasjon.egetAS;
  if (
    !erSvarid(ArbeidssituasjonType.erArbeidssøker) &&
    endretArbeidssituasjon.arbeidssøker
  )
    delete endretArbeidssituasjon.arbeidssøker;
  if (
    !erSvarid(ArbeidssituasjonType.tarUtdanning) &&
    endretArbeidssituasjon.underUtdanning
  )
    delete endretArbeidssituasjon.underUtdanning;

  return endretArbeidssituasjon;
};
