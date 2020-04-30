import styled from 'styled-components/macro';

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

  .tilbake {
    grid-area: tilbake;
  }

  .neste {
    grid-area: neste;
  }

  .avbryt {
    grid-area: avbryt;
  }
`;
