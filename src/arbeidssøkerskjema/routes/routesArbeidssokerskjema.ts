import { IRoute } from '../../models/routes';
import { hentPath } from '../../utils/routing';

export enum ERouteArbeidssøkerskjema {
  Forside = 'Forside',
  Spørsmål = 'Spørsmål',
  Oppsummering = 'Oppsummering',
  Kvittering = 'Kvittering',
}

export const RoutesArbeidssokerskjema: IRoute[] = [
  {
    path: '/arbeidssoker',
    label: 'Forside',
    route: ERouteArbeidssøkerskjema.Forside,
  },
  {
    path: '/arbeidssoker/sporsmal',
    label: 'Spørsmål',
    route: ERouteArbeidssøkerskjema.Spørsmål,
  },
  {
    path: '/arbeidssoker/oppsummering',
    label: 'Oppsummering',
    route: ERouteArbeidssøkerskjema.Oppsummering,
  },
  {
    path: '/arbeidssoker/kvittering',
    label: 'Kvittering',
    route: ERouteArbeidssøkerskjema.Kvittering,
  },
];

export const erUrlArbeidssøkerSkjema = (): boolean => {
  return window.location.href.includes(
    process.env.PUBLIC_URL +
      hentPath(RoutesArbeidssokerskjema, ERouteArbeidssøkerskjema.Forside)
  );
};

export const arbeidssøkerSkjemaForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(RoutesArbeidssokerskjema, ERouteArbeidssøkerskjema.Forside);
