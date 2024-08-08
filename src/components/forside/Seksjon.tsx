import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledSeksjon = styled.div`
  margin-bottom: 3rem;

  & > *:nth-child(n + 1) {
    margin-top: 1.3rem;
  }
`;

type SeksjonProps = {
  children: ReactNode;
};

export const Seksjon: React.FC<SeksjonProps> = ({ children }) => {
  return <StyledSeksjon>{children}</StyledSeksjon>;
};
