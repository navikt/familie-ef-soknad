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
    path: '/barnetilsyn/neste',
    label: 'Barna dine',
    route: RouteEnum.BarnaDine,
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
