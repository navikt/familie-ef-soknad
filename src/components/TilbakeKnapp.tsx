import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import styled from 'styled-components';
import LocaleTekst from '../language/LocaleTekst';

const StyledTilbakeKnapp = styled.div`
  .lenke {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  path: string;
  onClick: () => void;
}

const TilbakeKnapp: React.FC<Props> = ({ path, onClick }) => {
  return (
    <StyledTilbakeKnapp>
      <Lenke href={path} onChange={() => onClick()}>
        <VenstreChevron />
        <LocaleTekst tekst={'knapp.tilbake'} />
      </Lenke>
    </StyledTilbakeKnapp>
  );
};

export default TilbakeKnapp;
