export interface IRoute {
  route: RouteEnum;
  path: string;
  label: string;
}

export enum RouteEnum {
  Forside = 'Forside',
  OmDeg = 'Om deg',
}

export const Routes: IRoute[] = [
  { path: '/barnetilsyn', label: 'Forside', route: RouteEnum.Forside },
  {
    path: '/barnetilsyn/om-deg',
    label: 'Om deg',
    route: RouteEnum.OmDeg,
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

export const erUrlArbeidssøkerSkjema = (): boolean => {
  return window.location.href.includes(
    process.env.PUBLIC_URL + hentPath(Routes, RouteEnum.Forside)
  );
};

export const arbeidssøkerSkjemaForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(Routes, RouteEnum.Forside);
