import { IRoute } from '../../models/routes';
import { hentPath } from '../../utils/routing';
const PUBLIC_URL = process.env.PUBLIC_URL || '/';
export enum ERouteSkolepenger {
  Forside = 'Forside',
  OmDeg = 'OmDeg',
  BosituasjonenDin = 'BosituasjonenDin',
  BarnaDine = 'BarnaDine',
  BostedOgSamvær = 'BostedOgSamvær',
  Utdanning = 'Utdanning',
  Oppsummering = 'Oppsummering',
  Dokumentasjon = 'Dokumentasjon',
  Kvittering = 'Kvittering',
}

export const RoutesSkolepenger: IRoute[] = [
  { path: '/skolepenger', label: 'Forside', route: ERouteSkolepenger.Forside },
  {
    path: '/skolepenger/om-deg',
    label: 'Om deg',
    route: ERouteSkolepenger.OmDeg,
  },
  {
    path: '/skolepenger/bosituasjon',
    label: 'Bosituasjonen din',
    route: ERouteSkolepenger.BosituasjonenDin,
  },
  {
    path: '/skolepenger/barn',
    label: 'Barna dine',
    route: ERouteSkolepenger.BarnaDine,
  },
  {
    path: '/skolepenger/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
    route: ERouteSkolepenger.BostedOgSamvær,
  },
  {
    path: '/skolepenger/utdanning',
    label: 'Utdanning',
    route: ERouteSkolepenger.Utdanning,
  },
  {
    path: '/skolepenger/oppsummering',
    label: 'Oppsummering',
    route: ERouteSkolepenger.Oppsummering,
  },
  {
    path: '/skolepenger/dokumentasjon',
    label: 'Dokumentasjon',
    route: ERouteSkolepenger.Dokumentasjon,
  },
  {
    path: '/skolepenger/kvittering',
    label: 'Kvittering',
    route: ERouteSkolepenger.Kvittering,
  },
];

export const erUrlSkolepenger = (): boolean => {
  return window.location.href.includes(
    PUBLIC_URL + hentPath(RoutesSkolepenger, ERouteSkolepenger.Forside)
  );
};

export const skolepengerForsideUrl = (): string =>
  window.location.origin +
  PUBLIC_URL +
  hentPath(RoutesSkolepenger, ERouteSkolepenger.Forside);
