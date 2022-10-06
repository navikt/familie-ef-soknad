import styled from 'styled-components/macro';

export const StyledKnapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'tilbake neste'
    'avbryt avbryt';
  max-width: 500px;
  @media all and (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'tilbake'
      'neste'
      'avbryt';
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

  .navds-button {
    font-size: 18px;
  }
`;
