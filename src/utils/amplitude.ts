import { ESkjemanavn, skjemanavnIdMapping } from './skjemanavn';
import amplitude from 'amplitude-js';
import { IDokumentasjon } from '../models/steg/dokumentasjon';

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init('default', '', {
  apiEndpoint: 'amplitude.nav.no/collect-auto',
  saveEvents: false,
  includeUtm: true,
  includeReferrer: true,
  platform: window.location.toString(),
});

// eslint-disable-next-line
export function logEvent(eventName: string, eventProperties: any) {
  amplitudeInstance.logEvent(eventName, eventProperties);
}

export const logSpørsmålBesvart = (
  skjemanavn: string,
  skjemaId: number,
  spørsmål: string,
  svar: string,
  skalLogges: boolean
) => {
  if (skalLogges) {
    logEvent('skjema spørsmål besvart', {
      skjemanavn,
      skjemaId,
      spørsmål,
      svar,
    });
  }
};

export const logSpørsmålBesvartOvergangsstønad = (
  spørsmål: string,
  svar: string,
  skalLogges: boolean
) => {
  const skjemanavn = ESkjemanavn.Overgangsstønad;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Overgangsstønad];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar, skalLogges);
};

export const logSpørsmålBesvartArbeidssokerskjema = (
  spørsmål: string,
  svar: string,
  skalLogges: boolean
) => {
  const skjemanavn = ESkjemanavn.Arbeidssøker;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Arbeidssøker];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar, skalLogges);
};

export const logSpørsmålBesvartBarnetilsyn = (
  spørsmål: string,
  svar: string,
  skalLogges: boolean
) => {
  const skjemanavn = ESkjemanavn.Barnetilsyn;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Barnetilsyn];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar, skalLogges);
};

export const logSpørsmålBesvartSkolepenger = (
  spørsmål: string,
  svar: string,
  skalLogges: boolean
) => {
  const skjemanavn = ESkjemanavn.Skolepenger;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Skolepenger];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar, skalLogges);
};

export const logSidevisningOvergangsstonad = (side: string) => {
  logEvent('besøk', {
    side,
    team_id: 'familie',
    applikasjon: 'OS-soknadsdialog',
    skjemanavn: ESkjemanavn.Overgangsstønad,
  });
};

export const logSidevisningArbeidssokerskjema = (side: string) => {
  logEvent('besøk', {
    side,
    team_id: 'familie',
    applikasjon: 'Arbeidssokerskjema',
    skjemanavn: ESkjemanavn.Arbeidssøker,
  });
};

export const logSidevisningBarnetilsyn = (side: string) => {
  logEvent('besøk', {
    side,
    team_id: 'familie',
    applikasjon: 'BT-soknadsdialog',
    skjemanavn: ESkjemanavn.Barnetilsyn,
  });
};

export const logSidevisningSkolepenger = (side: string) => {
  logEvent('besøk', {
    side,
    team_id: 'familie',
    applikasjon: 'SP-soknadsdialog',
    skjemanavn: ESkjemanavn.Skolepenger,
  });
};

const logDokumetasjonsbehovOppsummering = (
  dokBehov: IDokumentasjon[],
  skjemanavn: ESkjemanavn
) => {
  const antallOpplastede = dokBehov.filter(
    (dok) =>
      dok.harSendtInn === false &&
      dok.opplastedeVedlegg !== undefined &&
      dok.opplastedeVedlegg.length > 0
  ).length;

  const antallTidligereInnsendte = dokBehov.filter(
    (dok) => dok.harSendtInn === true
  ).length;

  const antallIkkeOppfylte = dokBehov.filter(
    (dok) =>
      dok.harSendtInn === false &&
      (dok.opplastedeVedlegg === undefined ||
        dok.opplastedeVedlegg.length === 0)
  ).length;

  const harOppfyltAlle = antallIkkeOppfylte === 0;

  logEvent('dokumentasjonsbehovOppsummering', {
    skjemanavn,
    antallDokBehov: dokBehov.length,
    antallOpplastede,
    antallTidligereInnsendte,
    antallOppfylte: antallOpplastede + antallTidligereInnsendte,
    antallIkkeOppfylte,
    harOppfyltAlle,
  });
};

const logDokumetasjonsbehovDetaljer = (
  dokBehov: IDokumentasjon[],
  skjemanavn: ESkjemanavn
) => {
  dokBehov.map((dok) =>
    logEvent('dokumentasjonsbehov', {
      dokumentLabel: dok.label,
      dokumentTittel: dok.tittel,
      dokumentId: dok.id,
      harSendtInn: dok.harSendtInn,
      opplastedeVedlegg: dok.opplastedeVedlegg?.length,
      skjemanavn: skjemanavn,
    })
  );
};

export const logDokumetasjonsbehov = (
  dokBehov: IDokumentasjon[],
  skjemanavn: ESkjemanavn
) => {
  logDokumetasjonsbehovDetaljer(dokBehov, skjemanavn);
  logDokumetasjonsbehovOppsummering(dokBehov, skjemanavn);
};

export const logAdressesperre = (skjemanavn: string) => {
  logEvent('adressesperre', {
    team_id: 'familie',
    skjemanavn,
  });
};

export const logInnsendingFeilet = (
  skjemanavn: string,
  skjemaId: number,
  feilmelding: string
) => {
  logEvent('skjema innsending feilet', {
    skjemanavn,
    skjemaId,
    feilmelding,
  });
};

export const logBrowserBackOppsummering = (
  skjemanavn: string,
  skjemaId: number
) => {
  logEvent('browser_back_oppsummering', {
    skjemanavn,
    skjemaId,
  });
};

interface FeilFilopplasting {
  type_feil: string;
  feilmelding: string;
  filstørrelse?: number;
  filtype?: string;
}

export const logFeilFilopplasting = (
  skjemanavn: string,
  skjemaId: number,
  feilInformasjon: FeilFilopplasting
) => {
  logEvent('filopplasting_feilet', {
    skjemanavn,
    skjemaId,
    ...feilInformasjon,
  });
};

export const logManglendeFelter = (
  skjemanavn: string,
  skjemaId: number,
  feilmelding: string
) => {
  logEvent('manglende_felter', {
    skjemanavn,
    skjemaId,
    feilmelding,
  });
};
