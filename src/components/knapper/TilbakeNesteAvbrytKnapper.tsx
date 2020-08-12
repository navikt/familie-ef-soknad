import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import classNames from 'classnames';
import { hentForrigeRoute, hentNesteRoute } from '../../utils/routing';
import StyledNavigeringsWrapper from './StyledNavigeringsWrapper';
import { IRoute } from '../../models/routes';
import { useHistory, useLocation } from 'react-router';

interface Props {
  routesStønad: IRoute[];
  erSpørsmålBesvart?: boolean;
  mellomlagreStønad?: (steg: string) => void;
}

const TilbakeNesteAvbrytKnapper: FC<Props> = ({
  routesStønad,
  erSpørsmålBesvart,
  mellomlagreStønad,
}) => {
  const location = useLocation();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(routesStønad, location.pathname);
  const forrigeRoute = hentForrigeRoute(routesStønad, location.pathname);

  return (
    <StyledNavigeringsWrapper
      classname={
        erSpørsmålBesvart ? 'side__knapper treKnapper' : 'side__knapper '
      }
    >
      <KnappBase
        className={'tilbake'}
        type={'standard'}
        onClick={() => history.push(forrigeRoute.path)}
      >
        <LocaleTekst tekst={'knapp.tilbake'} />
      </KnappBase>
      {erSpørsmålBesvart && (
        <KnappBase
          type={'hoved'}
          onClick={() => {
            if (mellomlagreStønad) {
              mellomlagreStønad(location.pathname);
            }
            history.push(nesteRoute.path);
          }}
          className={classNames(
            'neste',
            `neste-${nesteRoute.path.replace('/', '')}`,
            {
              hideButton: nesteRoute === undefined,
            }
          )}
        >
          <LocaleTekst tekst={'knapp.neste'} />
        </KnappBase>
      )}
      <KnappBase
        className={'avbryt'}
        type={'flat'}
        onClick={() => history.push(routesStønad[0].path)}
      >
        <LocaleTekst tekst={'knapp.avbryt'} />
      </KnappBase>
    </StyledNavigeringsWrapper>
  );
};

export default TilbakeNesteAvbrytKnapper;
