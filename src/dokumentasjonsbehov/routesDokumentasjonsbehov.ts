export const erUrlDokumentasjonsbehov = (): boolean =>
  window.location.href.includes(process.env.PUBLIC_URL + '/innsendtsoknad');
