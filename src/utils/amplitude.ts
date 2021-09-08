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

export function logEvent(eventName: string, eventProperties: any) {
  amplitudeInstance.logEvent(eventName, eventProperties);
}

export const logSpørsmålBesvart = (
  skjemanavn: string,
  skjemaId: number,
  spørsmål: string,
  svar: string,
  props?: any
) => {
  logEvent('skjema_spørsmål_besvart', {
    skjemanavn,
    skjemaId,
    spørsmål,
    svar,
    ...props,
  });
};

export const logSpørsmålBesvartOvergangsstønad = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = ESkjemanavn.Overgangsstønad;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Overgangsstønad];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartArbeidssokerskjema = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = ESkjemanavn.Arbeidssøker;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Arbeidssøker];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartBarnetilsyn = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = ESkjemanavn.Barnetilsyn;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Barnetilsyn];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartSkolepenger = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = ESkjemanavn.Skolepenger;
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Skolepenger];
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSidevisningOvergangsstonad = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'OS-soknadsdialog',
    skjemanavn: ESkjemanavn.Overgangsstønad,
  });
};

export const logSidevisningArbeidssokerskjema = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'Arbeidssokerskjema',
    skjemanavn: ESkjemanavn.Arbeidssøker,
  });
};

export const logSidevisningBarnetilsyn = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'BT-soknadsdialog',
    skjemanavn: ESkjemanavn.Barnetilsyn,
  });
};

export const logSidevisningSkolepenger = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'SP-soknadsdialog',
    skjemanavn: ESkjemanavn.Skolepenger,
  });
};

export const logDokumetasjonsbehov = (
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

export const logAdressesperre = (skjemanavn: string) => {
  logEvent('adressesperre', {
    team_id: 'familie',
    skjemanavn,
  });
};

export const logInnsendingFeilet = (
  skjemanavn: string,
  skjemaId: number,
  feilmelding: string,
  props?: any
) => {
  logEvent('skjema_innsending_feilet', {
    skjemanavn,
    skjemaId,
    feilmelding,
    ...props,
  });
};

export const logBrowserBackOppsummering = (
  skjemanavn: string,
  skjemaId: number,
  ...props: any
) => {
  logEvent('browser_back_oppsummering', {
    skjemanavn,
    skjemaId,
    ...props,
  });
};
