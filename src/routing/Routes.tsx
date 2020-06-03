export interface IRoute {
  route: RouteEnum;
  path: string;
  label: string;
}

export enum RouteEnum {
  Forside = 'Forside',
  OmDeg = 'OmDeg',
  BosituasjonenDin = 'BosituasjonenDin',
  Barn = 'Barn',
  BarnasBosted = 'BarnasBosted',
  Aktivitet = 'Aktivitet',
  DinSituasjon = 'DinSituasjon',
  Oppsummering = 'Oppsummering',
  Dokumentasjon = 'Dokumentasjon',
  Kvittering = 'Kvittering',
}

export const Routes: IRoute[] = [
  { path: '/', label: 'Forside', route: RouteEnum.Forside },
  { path: '/om-deg', label: 'Om deg', route: RouteEnum.OmDeg },
  {
    path: '/bosituasjon',
    label: 'Bosituasjonen din',
    route: RouteEnum.BosituasjonenDin,
  },
  { path: '/barn', label: 'Barn', route: RouteEnum.Barn },
  {
    path: '/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
    route: RouteEnum.BarnasBosted,
  },
  {
    path: '/aktivitet',
    label: 'Arbeid, utdanning og andre aktiviteter',
    route: RouteEnum.Aktivitet,
  },
  {
    path: '/din-situasjon',
    label: 'Din situasjon',
    route: RouteEnum.DinSituasjon,
  },
  {
    path: '/oppsummering',
    label: 'Oppsummering',
    route: RouteEnum.Oppsummering,
  },
  {
    path: '/dokumentasjon',
    label: 'Dokumentasjon',
    route: RouteEnum.Dokumentasjon,
  },
  { path: '/kvittering', label: 'Kvittering', route: RouteEnum.Kvittering },
];

export const hentPath = (routes: IRoute[], route: RouteEnum) => {
  return routes.find((r) => r.route === route)?.path;
};
