import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import styled from 'styled-components';
import LocaleTekst from '../language/LocaleTekst';
import { Link } from 'react-router-dom';

const StyledTilbakeKnapp = styled.div`
  padding: 1rem 0 1rem 0;

  .lenke {
    color: #0067C5;
    background: none;
    text-decoration: none;
    cursor: pointer;
    }

    .lenke:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  path: string;
}

const TilbakeKnapp: React.FC<Props> = ({ path }) => {
  return (
    <StyledTilbakeKnapp>
      <Link to={path} className={'lenke'}>
        <VenstreChevron />
        <LocaleTekst tekst={'knapp.tilbake'} />
      </Link>
    </StyledTilbakeKnapp>
  );
};

export default TilbakeKnapp;
