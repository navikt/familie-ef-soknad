import { hentPath } from '../utils/routing';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from './routing/routesOvergangsstonad';

export const hentPathOvergangsstønadOppsummering = hentPath(
  RoutesOvergangsstonad,
  ERouteOvergangsstønad.Oppsummering
);

export const FnrOgDnrTilAlder = (fnrEllerDnr: string): number => {
  const førsteSiffer = parseInt(fnrEllerDnr[0], 10);

  let fnr = '';

  if (førsteSiffer > 3) {
    fnr =
      (førsteSiffer - 4).toString() +
      fnrEllerDnr.substring(1, fnrEllerDnr.length);
  } else {
    fnr = fnrEllerDnr;
  }

  const nå = new Date();

  const årNå = nå.getFullYear();
  const månedNå = nå.getMonth() + 1;
  const dagNå = nå.getDate();

  const dag = parseInt(fnr.substring(0, 2), 10);
  const måned = parseInt(fnr.substring(2, 4), 10);
  const stringÅr = fnr.substring(4, 6);

  const år =
    stringÅr[0] === '0'
      ? parseInt('20' + stringÅr, 10)
      : parseInt('19' + stringÅr, 10);

  let alder = årNå - år;

  if (månedNå < måned) {
    alder--;
  }

  if (måned === månedNå && dagNå < dag) {
    alder--;
  }

  return alder;
};
