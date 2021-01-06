import { IPersonDetaljer } from '../models/søknad/person';

export const harFyltUtSamboerDetaljer = (
  samboerDetaljer: IPersonDetaljer,
  valgfriIdentEllerFødselsdato: boolean
): boolean => {
  const fyltUtIdentEllerFødselsdato =
    !valgfriIdentEllerFødselsdato && !samboerDetaljer.kjennerIkkeIdent
      ? samboerDetaljer?.ident?.verdi !== ''
      : samboerDetaljer.fødselsdato?.verdi !== undefined;

  return (
    samboerDetaljer?.navn?.verdi !== '' &&
    (valgfriIdentEllerFødselsdato || fyltUtIdentEllerFødselsdato)
  );
};
