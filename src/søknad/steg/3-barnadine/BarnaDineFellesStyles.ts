import styled from 'styled-components';

export const BarneKortWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 568px;
  margin: auto;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

export const BarnaDineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
