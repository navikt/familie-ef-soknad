import { IPersonDetaljer } from '../models/søknad/person';

export const harFyltUtSamboerDetaljer = (
  samboerDetaljer: IPersonDetaljer,
  valgfriIdentEllerFødselsdato: boolean
): boolean => {
  const harFyltUtFødselsdatoEllerIdent = samboerDetaljer.kjennerIkkeIdent
    ? samboerDetaljer.fødselsdato?.verdi !== undefined
    : samboerDetaljer?.ident?.verdi !== '' &&
      samboerDetaljer?.ident?.verdi !== undefined;

  return valgfriIdentEllerFødselsdato
    ? samboerDetaljer?.navn?.verdi !== '' &&
        samboerDetaljer?.navn?.verdi !== undefined
    : harFyltUtFødselsdatoEllerIdent &&
        samboerDetaljer?.navn?.verdi !== '' &&
        samboerDetaljer?.navn?.verdi !== undefined;
};
