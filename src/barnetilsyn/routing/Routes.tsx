export interface IRoute {
  route: RouteEnum;
  path: string;
  label: string;
}

export enum RouteEnum {
  Forside = 'Forside',
  OmDeg = 'OmDeg',
  BosituasjonenDin = 'BosituasjonenDin',
}

export const Routes: IRoute[] = [
  { path: '/barnetilsyn', label: 'Forside', route: RouteEnum.Forside },
  { path: 'barnetilsyn/om-deg', label: 'Om deg', route: RouteEnum.OmDeg },
  {
    path: 'barnetilsyn/bosituasjon',
    label: 'Bosituasjonen din',
    route: RouteEnum.BosituasjonenDin,
  },
];

export const hentPath = (routes: IRoute[], route: RouteEnum) => {
  return routes.find((r) => r.route === route)?.path;
};

export const barnetilsynForsideUrl = (): string =>
  window.location.origin +
  process.env.PUBLIC_URL +
  hentPath(Routes, RouteEnum.Forside);
