import React from 'react';
import styled from 'styled-components/macro';

const StyledTittelOgSlettKnapp = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  grid-template-areas:
    'tittel slett'
    'felter felter';
  padding-bottom: 2rem;

  @media @mobile {
    display: flex;
    flex-direction: column;
  }
  .tittel {
    grid-area: tittel;
  }

  .slettknapp {
    grid-area: slett;
    justify-self: end;
  }
`;

const TittelOgSlettKnapp: React.FC = ({ children }) => {
  return <StyledTittelOgSlettKnapp>{children}</StyledTittelOgSlettKnapp>;
};

export default TittelOgSlettKnapp;
