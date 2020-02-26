import React from 'react';
import styled from 'styled-components';

const StyledKomponentGruppe = styled.div`
  padding-bottom: 50px;

  &:last-child {
    padding-bottom: 0;
  }
  .skjemaelement {
    margin-bottom: 0;
  }

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
  }
`;

const KomponentGruppe: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <StyledKomponentGruppe className={className}>
      {children}
    </StyledKomponentGruppe>
  );
};

export default KomponentGruppe;
