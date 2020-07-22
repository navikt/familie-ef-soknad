export interface IRoute {
  route: RouteEnum;
  path: string;
  label: string;
}

export enum RouteEnum {
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

export const Routes: IRoute[] = [
  { path: '/barnetilsyn', label: 'Forside', route: RouteEnum.Forside },
  { path: '/barnetilsyn/om-deg', label: 'Om deg', route: RouteEnum.OmDeg },
  {
    path: '/barnetilsyn/bosituasjon',
    label: 'Bosituasjonen din',
    route: RouteEnum.BosituasjonenDin,
  },
  {
    path: '/barnetilsyn/barn',
    label: 'Barna dine',
    route: RouteEnum.BarnaDine,
  },
  {
    path: '/barnetilsyn/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
    route: RouteEnum.BostedOgSamvær,
  },
  {
    path: '/barnetilsyn/aktivitet',
    label: 'Arbeid, utdanning og andre aktiviteter',
    route: RouteEnum.Aktivitet,
  },
  {
    path: '/barnetilsyn/barnepass',
    label: 'barnepass',
    route: RouteEnum.Barnepass,
  },
  {
    path: '/barnetilsyn/oppsummering',
    label: 'Oppsummering',
    route: RouteEnum.Oppsummering,
  },
  {
    path: '/barnetilsyn/dokumentasjon',
    label: 'Dokumentasjon',
    route: RouteEnum.Dokumentasjon,
  },
  {
    path: '/barnetilsyn/kvittering',
    label: 'Kvittering',
    route: RouteEnum.Kvittering,
  },
];

export const hentForrigeRoute = (routes: IRoute[], currentPath: string) => {
  const routeIndex = routes.findIndex((route) => route.path === currentPath);
  const forrigeRoute = routes[routeIndex - 1];
  return forrigeRoute;
};

export const hentNesteRoute = (routes: IRoute[], currentPath: string) => {
  const routeIndex = routes.findIndex((route) => route.path === currentPath);
  const nesteRoute = routes[routeIndex + 1];
  return nesteRoute;
};

export const hentPath = (routes: IRoute[], route: RouteEnum) => {
  return routes.find((r) => r.route === route)?.path;
};

export const barnetilsynForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(Routes, RouteEnum.Forside);
