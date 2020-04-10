import { IDokumentasjon } from '../models/dokumentasjon';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { hentIdHvisFinnesIListe } from '../utils/søknad';

export const hentDokumentasjonsbehovTilSpørsmålOgSvar = (
  spørsmål: ISpørsmål,
  valgtSvar: ISvar,
  dokumentasjonsbehovliste: IDokumentasjon[]
): IDokumentasjon | undefined =>
  dokumentasjonsbehovliste.find((behov) => {
    const svaridTilBehov = Array.isArray(behov.svarid)
      ? hentIdHvisFinnesIListe(valgtSvar.id, behov.svarid)
      : behov.svarid;
    return behov.spørsmålid === spørsmål.søknadid && svaridTilBehov;
  });
