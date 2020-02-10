import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import styled from 'styled-components';
import LocaleTekst from '../../language/LocaleTekst';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

const StyledTilbakeKnapp = styled.div`
  padding: 1rem 0 1rem;
  width: 75px;

  .lenke {
    color: @navBla;
    background: none;
    text-decoration: none;
    cursor: pointer;
    display:grid;
    grid-template-columns: auto auto;
    border: none;
    }

    .lenke:hover {
      text-decoration: underline;
    }
    
    .lenke > .ikon {
      grid-column-start: 1;
      grid-column-end: 2;
      padding-top: 2px;
    }
    
    .lenke > .typo-normal {
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }
`;

interface Props {
  path: string;
}

const TilbakeKnapp: React.FC<Props> = ({ path }) => {
  return (
    <StyledTilbakeKnapp>
      <Link className={'lenke'} to={path}>
        <div className={'ikon'}>
          <VenstreChevron />
        </div>
        <Normaltekst>
          <LocaleTekst tekst={'knapp.tilbake'} />
        </Normaltekst>
      </Link>
    </StyledTilbakeKnapp>
  );
};

export default TilbakeKnapp;
