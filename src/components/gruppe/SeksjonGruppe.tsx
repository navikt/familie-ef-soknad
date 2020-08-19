import React from 'react';
import styled from 'styled-components/macro';

const StyledFeltGruppe = styled.section`
  padding-bottom: 80px;

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
  }
  .typo-normal,
  .typo-element {
    font-size: 18px;
  }
`;

const SeksjonGruppe: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return <StyledFeltGruppe className={className}>{children}</StyledFeltGruppe>;
};

export default SeksjonGruppe;
