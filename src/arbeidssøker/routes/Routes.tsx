export interface IRoute {
  route: RouteEnum;
  path: string;
  label: string;
}

export enum RouteEnum {
  Forside = 'Forside',
  Spørsmål = 'Spørsmål',
  Oppsummering = 'Oppsummering',
  Kvittering = 'Kvittering',
}

export const Routes: IRoute[] = [
  { path: '/arbeidssøker', label: 'Forside', route: RouteEnum.Forside },
  {
    path: '/arbeidssøker/spørsmål',
    label: 'Spørsmål',
    route: RouteEnum.Spørsmål,
  },
  {
    path: '/arbeidssøker/oppsummering',
    label: 'Oppsummering',
    route: RouteEnum.Oppsummering,
  },
  {
    path: '/arbeidssøker/kvittering',
    label: 'Kvittering',
    route: RouteEnum.Kvittering,
  },
];

export const hentPath = (routes: IRoute[], route: RouteEnum) => {
  return routes.find((r) => r.route === route)?.path;
};

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
