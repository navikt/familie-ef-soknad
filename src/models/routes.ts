import { ERouteSkolepenger } from '../skolepenger/routing/routes';
import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { ERouteArbeidssøkerskjema } from '../arbeidssøkerskjema/routes/routesArbeidssokerskjema';
import { ERouteOvergangsstønad } from '../overgangsstønad/routing/routesOvergangsstonad';

export type RouteType =
  | ERouteSkolepenger
  | ERouteBarnetilsyn
  | ERouteOvergangsstønad
  | ERouteArbeidssøkerskjema;

export interface IRoute {
  route: RouteType;
  path: string;
  label: string;
  localeTeskt?: string;
}
