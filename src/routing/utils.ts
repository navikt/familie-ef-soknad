import { IRoute } from './Routes';

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
