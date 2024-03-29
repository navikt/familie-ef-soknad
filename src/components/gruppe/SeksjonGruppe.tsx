import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.section`
  padding-bottom: 80px;
`;

const SeksjonGruppe: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => {
  return <StyledFeltGruppe className={className}>{children}</StyledFeltGruppe>;
};

export default SeksjonGruppe;
