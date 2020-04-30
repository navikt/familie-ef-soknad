import styled from 'styled-components';

export const StyledKnapper = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'tilbake neste'
    'avbryt avbryt';
  grid-gap: 1rem;

  .hideButton {
    display: none;
  }
`;

export const StyledTilbakeKnapp = styled.div`
  grid-area: tilbake;
`;
export const StyledNesteKnapp = styled.div`
  grid-area: neste;
`;
export const StyledAvbrytKnapp = styled.div`
  grid-area: avbryt;
`;
