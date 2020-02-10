import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.div`
  padding-bottom: 50px;

  &:last-child {
    padding-bottom: 0;
  }

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
  }
`;

const FeltGruppe: React.FC = ({ children }) => {
  return <StyledFeltGruppe>{children}</StyledFeltGruppe>;
};

export default FeltGruppe;
