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
    display: flex;
    padding-top: 2px;
  }
  .kunEn {
    display: none;
  }
`;

const TittelOgSlettKnapp: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <StyledTittelOgSlettKnapp>{children}</StyledTittelOgSlettKnapp>;
};

export default TittelOgSlettKnapp;
