import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.div`
  padding-bottom: 25px;

  &:last-child {
    padding-bottom: 0;
    padding-top: 25px;
  }

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
  }
`;

const FeltGruppe: React.FC<{ classname?: string }> = ({
  classname,
  children,
}) => {
  return <StyledFeltGruppe className={classname}>{children}</StyledFeltGruppe>;
};

export default FeltGruppe;
