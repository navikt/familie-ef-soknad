import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import { Link } from 'react-router-dom';
import { hentPath } from '../../../utils/routing';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from '../../routing/routesOvergangsstonad';

const ManglendeInformasjonAlert: FC = () => (
  <KomponentGruppe>
    <AlertStripe type={'advarsel'} form={'inline'}>
      <LocaleTekst tekst="dokumentasjon.alert.gåTilbake" />{' '}
      <Link
        to={{
          pathname: hentPath(
            RoutesOvergangsstonad,
            ERouteOvergangsstønad.OmDeg
          ),
          state: { kommerFraOppsummering: true },
        }}
      >
        <LocaleTekst tekst="dokumentasjon.alert.link.fylleInn" />
      </Link>
      <LocaleTekst tekst="dokumentasjon.alert.manglende" />
    </AlertStripe>
  </KomponentGruppe>
);

export default ManglendeInformasjonAlert;
