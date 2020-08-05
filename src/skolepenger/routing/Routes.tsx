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
  Utdanning = 'Utdanning',
  Oppsummering = 'Oppsummering',
  Dokumentasjon = 'Dokumentasjon',
  Kvittering = 'Kvittering',
}

export const Routes: IRoute[] = [
  { path: '/skolepenger', label: 'Forside', route: RouteEnum.Forside },
  { path: '/skolepenger/om-deg', label: 'Om deg', route: RouteEnum.OmDeg },
  {
    path: '/skolepenger/bosituasjon',
    label: 'Bosituasjonen din',
    route: RouteEnum.BosituasjonenDin,
  },
  {
    path: '/skolepenger/barn',
    label: 'Barna dine',
    route: RouteEnum.BarnaDine,
  },
  {
    path: '/skolepenger/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
    route: RouteEnum.BostedOgSamvær,
  },
  {
    path: '/skolepenger/utdanning',
    label: 'Utdanning',
    route: RouteEnum.Utdanning,
  },
  {
    path: '/skolepenger/oppsummering',
    label: 'Oppsummering',
    route: RouteEnum.Oppsummering,
  },
  {
    path: '/skolepenger/dokumentasjon',
    label: 'Dokumentasjon',
    route: RouteEnum.Dokumentasjon,
  },
  {
    path: '/skolepenger/kvittering',
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

export const skolepengerForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(Routes, RouteEnum.Forside);
