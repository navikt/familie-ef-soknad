import React from 'react';
import styled from 'styled-components/macro';

const StyledKomponentGruppe = styled.div`
  padding-bottom: 50px;

  &:last-child {
    padding-bottom: 0;
  }
  .skjemaelement {
    margin-bottom: 0;
  }

  .alertstripe {
    padding-top: 1rem;
  }

  .typo-normal {
    font-size: 18px;
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
