import { IRoute } from '../../models/routes';
import { hentPath } from '../../utils/routing';

export enum ERouteBarnetilsyn {
  Forside = 'Forside',
  OmDeg = 'OmDeg',
  BosituasjonenDin = 'BosituasjonenDin',
  BarnaDine = 'BarnaDine',
  BostedOgSamvær = 'BostedOgSamvær',
  Aktivitet = 'Aktivitet',
  Barnepass = 'Barnepass',
  Oppsummering = 'Oppsummering',
  Dokumentasjon = 'Dokumentasjon',
  Kvittering = 'Kvittering',
}

export const RoutesBarnetilsyn: IRoute[] = [
  { path: '/barnetilsyn', label: 'Forside', route: ERouteBarnetilsyn.Forside },
  {
    path: '/barnetilsyn/om-deg',
    label: 'Om deg',
    route: ERouteBarnetilsyn.OmDeg,
  },
  {
    path: '/barnetilsyn/bosituasjon',
    label: 'Bosituasjonen din',
    route: ERouteBarnetilsyn.BosituasjonenDin,
  },
  {
    path: '/barnetilsyn/barn',
    label: 'Barna dine',
    route: ERouteBarnetilsyn.BarnaDine,
  },
  {
    path: '/barnetilsyn/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
    route: ERouteBarnetilsyn.BostedOgSamvær,
  },
  {
    path: '/barnetilsyn/aktivitet',
    label: 'Arbeidssituasjonen din',
    route: ERouteBarnetilsyn.Aktivitet,
  },
  {
    path: '/barnetilsyn/barnepass',
    label: 'barnepass',
    route: ERouteBarnetilsyn.Barnepass,
  },
  {
    path: '/barnetilsyn/oppsummering',
    label: 'Oppsummering',
    route: ERouteBarnetilsyn.Oppsummering,
  },
  {
    path: '/barnetilsyn/dokumentasjon',
    label: 'Dokumentasjon',
    route: ERouteBarnetilsyn.Dokumentasjon,
  },
  {
    path: '/barnetilsyn/kvittering',
    label: 'Kvittering',
    route: ERouteBarnetilsyn.Kvittering,
  },
];

export const erUrlBarnetilsyn = (): boolean => {
  return window.location.href.includes(
    process.env.PUBLIC_URL +
      hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.Forside)
  );
};

export const barnetilsynForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.Forside);
