import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import classNames from 'classnames';
import { hentForrigeRoute, hentNesteRoute } from '../../utils/routing';
import { IRoute } from '../../models/routes';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

const StyledNavigeringsKnapper = styled.div`
  padding: 2rem;
  grid-area: knapper;
  display: flex;
  justify-self: center;
  flex-direction: column;

  .knapp {
    font-size: 18px;
  }

  .avbryt {
    margin-top: 1rem;
  }

  @media all and (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'tilbake'
      'neste'
      'avbryt';
  }

  .treKnapper {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(2, min-content);
    grid-template-areas:
      'tilbake neste'
      'avbryt avbryt';

    @supports (grid-gap: 1rem) {
      grid-gap: 1rem;

      .avbryt {
        margin-top: 0;
      }
    }
    .hideButton {
      display: none;
    }

    .tilbake {
      grid-area: tilbake;
    }

    .neste {
      grid-area: neste;
    }
    .avbryt {
      grid-area: avbryt;
    }
  }
`;

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
    <StyledNavigeringsKnapper
      className={
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
            +`neste-${nesteRoute.path.replace('/', '')}`,
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
    </StyledNavigeringsKnapper>
  );
};

export default TilbakeNesteAvbrytKnapper;
