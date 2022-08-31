import React from 'react';
import styled from 'styled-components/macro';

const StyledFeltGruppe = styled.section`
  padding-bottom: 80px;

  .navds-body-short,
  .navds-body-long,
  .navds-label {
    font-size: 18px;
  }
`;

const SeksjonGruppe: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => {
  return <StyledFeltGruppe className={className}>{children}</StyledFeltGruppe>;
};

export default SeksjonGruppe;
