import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledLabelVerdiGruppe = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'label'
    'verdi';

  .typo-element {
    grid-area: label;
    padding-top: 15px;
  }
  .typo-normal,
  .verdi {
    grid-area: verdi;
  }
  .typo-normal {
    margin-top: 0.5rem;
  }
`;

const LabelVerdiGruppe: FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <StyledLabelVerdiGruppe className={className}>
      {children}
    </StyledLabelVerdiGruppe>
  );
};
export default LabelVerdiGruppe;
