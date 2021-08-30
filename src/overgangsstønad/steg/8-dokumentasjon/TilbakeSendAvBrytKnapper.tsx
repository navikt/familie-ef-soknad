import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { StyledKnapper } from '../../../arbeidssøkerskjema/komponenter/StyledKnapper';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentForrigeRoute } from '../../../utils/routing';
import { Innsending } from './SendSøknad';
import { useLocation } from 'react-router-dom';
import { ISøknad, LocationStateSøknad } from '../../../models/søknad/søknad';
import { useHistory } from 'react-router';

interface Props {
  innsendingState: Innsending;
  søknad: ISøknad;
  sendSøknad: (søknad: ISøknad) => void;
}

const TilbakeSendAvBrytKnapper: FC<Props> = ({
  innsendingState,
  søknad,
  sendSøknad,
}) => {
  const location = useLocation<LocationStateSøknad>();
  const history = useHistory();

  const forrigeRoute = hentForrigeRoute(
    RoutesOvergangsstonad,
    location.pathname
  );

  const validerSøkerBosattINorgeSisteTreÅr = (søknad: ISøknad) => {
    return søknad.medlemskap.søkerBosattINorgeSisteTreÅr;
  };

  return (
    <SeksjonGruppe className={'sentrert'}>
      <StyledKnapper>
        <KnappBase
          className={'tilbake'}
          type={'standard'}
          onClick={() => history.push(forrigeRoute.path)}
        >
          <LocaleTekst tekst={'knapp.tilbake'} />
        </KnappBase>

        {validerSøkerBosattINorgeSisteTreÅr(søknad) && (
          <KnappBase
            type={'hoved'}
            onClick={() => !innsendingState.venter && sendSøknad(søknad)}
            className={'neste'}
            spinner={innsendingState.venter}
          >
            <LocaleTekst tekst={'knapp.sendSøknad'} />
          </KnappBase>
        )}
        <KnappBase
          className={'avbryt'}
          type={'flat'}
          onClick={() => history.push(RoutesOvergangsstonad[0].path)}
        >
          <LocaleTekst tekst={'knapp.avbryt'} />
        </KnappBase>
      </StyledKnapper>
    </SeksjonGruppe>
  );
};
export default TilbakeSendAvBrytKnapper;
