import { IPersonDetaljer } from '../models/søknad/person';

export const harFyltUtSamboerDetaljer = (
  samboerDetaljer: IPersonDetaljer,
  valgfriIdentEllerFødselsdato: boolean
): boolean => {
  const harFyltUtFødselsdato =
    (samboerDetaljer?.ident?.verdi !== '' &&
      samboerDetaljer?.ident?.verdi !== undefined) ||
    samboerDetaljer.fødselsdato?.verdi !== undefined;

  return (
    samboerDetaljer?.navn?.verdi !== '' &&
    samboerDetaljer.kjennerIkkeIdent === true &&
    (valgfriIdentEllerFødselsdato || harFyltUtFødselsdato)
  );
};
