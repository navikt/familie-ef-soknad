import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import { hentForrigeRoute, hentNesteRoute } from '../../utils/routing';
import { IRoute } from '../../models/routes';
import { useLocation } from 'react-router';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const nesteRoute = hentNesteRoute(routesStønad, location.pathname);
  const forrigeRoute = hentForrigeRoute(routesStønad, location.pathname);

  return (
    <StyledNavigeringsKnapper
      className={
        erSpørsmålBesvart ? 'side__knapper treKnapper' : 'side__knapper '
      }
      aria-live="polite"
    >
      <KnappBase
        className={'tilbake'}
        type={'standard'}
        onClick={() => navigate(forrigeRoute.path)}
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
            navigate(nesteRoute.path);
          }}
          className={'neste'}
        >
          <LocaleTekst tekst={'knapp.neste'} />
        </KnappBase>
      )}
      <KnappBase
        className={'avbryt'}
        type={'flat'}
        onClick={() => navigate(routesStønad[0].path)}
      >
        <LocaleTekst tekst={'knapp.avbryt'} />
      </KnappBase>
    </StyledNavigeringsKnapper>
  );
};

export default TilbakeNesteAvbrytKnapper;
