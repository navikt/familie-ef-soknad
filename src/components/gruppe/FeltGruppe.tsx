import React from 'react';
import styled from 'styled-components/macro';

const StyledFeltGruppe = styled.div`
  padding-bottom: 30px;

  .skjemaelement {
    margin-bottom: 0;

    &__label {
      margin-bottom: 1rem;
    }
  }

  &:last-child {
    padding-bottom: 0;
  }

  .navds-alert {
    padding-top: 1rem;
  }

  &.datoOgPersonnummer {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-auto-rows: 1fr;
    grid-template-areas: 'forste andre';
    grid-gap: 1rem;

    @media all and (max-width: 420px) {
      grid-template-columns: max-content;
      grid-auto-rows: max-content;
      grid-template-areas:
        'forste'
        'andre';
    }

    & > .datovelger {
      grid-area: forste;
    }
    & > .skjemaelement {
      grid-area: andre;

      .skjemaelement__label {
        margin-bottom: 1rem;
      }
    }
  }
`;

const FeltGruppe: React.FC<{
  classname?: string;
  children?: React.ReactNode;
}> = ({ classname, children }) => {
  return <StyledFeltGruppe className={classname}>{children}</StyledFeltGruppe>;
};

export default FeltGruppe;
