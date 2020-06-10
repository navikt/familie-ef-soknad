import styled from 'styled-components/macro';

export const FortsettSøknadKnappWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'fortsett'
    'start-ny';
  max-width: 500px;
  .hideButton {
    display: none;
  }

  .fortsett {
    grid-area: fortsett;
  }

  .start-ny {
    grid-area: start-ny;
  }
`;
