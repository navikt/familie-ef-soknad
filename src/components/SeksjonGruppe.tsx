import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
  }
`;

const SeksjonGruppe: React.FC = ({ children }) => {
  return <StyledFeltGruppe>{children}</StyledFeltGruppe>;
};

export default SeksjonGruppe;
