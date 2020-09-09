import { IDokumentasjonsbehov, SøknadType } from './DokumentasjonsbehovModel';
import { Stønadstype } from '../models/søknad/stønadstyper';
import { IDokumentasjon } from '../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../søknad/DokumentasjonsConfig';

export const søknadTypeTilStønadType = (type: SøknadType) => {
  switch (type) {
    case SøknadType.OVERGANGSSTØNAD:
      return Stønadstype.overgangsstønad;
    case SøknadType.BARNETILSYN:
      return Stønadstype.barnetilsyn;
    case SøknadType.SKOLEPENGER:
      return Stønadstype.skolepenger;
    default:
      throw new Error(`Finner ikke søknadsType ${type}`);
  }
};

export const søknadTypeTilEttersendelseUrl = (type: SøknadType) => {
  let skjemanummer;
  switch (type) {
    case SøknadType.OVERGANGSSTØNAD:
      skjemanummer = 'NAV%2015-00.01';
      break;
    case SøknadType.BARNETILSYN:
      skjemanummer = 'NAV%2015-00.02';
      break;
    case SøknadType.SKOLEPENGER:
      skjemanummer = 'NAV%2015-00.04';
      break;
    default:
      throw new Error(`Finner ikke søknadsType ${type}`);
  }
  return `https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/${skjemanummer}/dokumentinnsending`;
};

export const hentDokumentasjonsConfigInnslagForDokumentasjonsbehov = (
  dokumentasjonsbehov: IDokumentasjonsbehov
): IDokumentasjon =>
  Object.values(DokumentasjonsConfig).filter(
    (dokumentasjon: IDokumentasjon) =>
      dokumentasjon.id === dokumentasjonsbehov.id
  )[0];

export const hentIngressTekst = (dokumentasjonMangler: boolean): string => {
  if (dokumentasjonMangler) {
    return (
      'Det ser ut til at det mangler noe dokumentasjon i søknaden du har sendt oss. ' +
      'Hvis du i mellomtiden har sendt oss dette, kan du se bort fra denne meldingen.'
    );
  } else {
    return (
      'Her kan du se dokumentasjonen du sendte inn sammen med søknaden din. ' +
      'Du kan ettersende dokumentasjon dersom du ser at noe mangler.'
    );
  }
};
