import React from 'react';
import styled from 'styled-components/macro';

const StyledKomponentGruppe = styled.div`
  padding-bottom: 60px;

  &:last-child {
    padding-bottom: 0;
  }
  .skjemaelement {
    margin-bottom: 0;
  }

  .alertstripe {
    padding-top: 1rem;
  }

  .typo-normal,
  .typo-element,
  .inputPanel__label,
  .skjemaelement__label {
    font-size: 18px;
  }
`;

const KomponentGruppe: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <StyledKomponentGruppe className={className} aria-live="polite">
      {children}
    </StyledKomponentGruppe>
  );
};

export default KomponentGruppe;
