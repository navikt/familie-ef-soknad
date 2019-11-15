import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.div`
  padding-bottom: 25px;

  &:first-child {
    padding-top: 25px;
  }
`;

const FeltGruppe: React.FC = ({ children }) => {
  return <StyledFeltGruppe>{children}</StyledFeltGruppe>;
};

export default FeltGruppe;
