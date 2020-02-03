import React from 'react';
import styled from 'styled-components';

const StyledFeltGruppe = styled.div`
  padding-bottom: 25px;

  &:last-child {
    padding-bottom: 0;
  }

  .alertstripe.fjernBakgrunn {
    background: transparent;
    border: none;
    padding-left: 0;
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

const FeltGruppe: React.FC<{ classname?: string }> = ({
  classname,
  children,
}) => {
  return <StyledFeltGruppe className={classname}>{children}</StyledFeltGruppe>;
};

export default FeltGruppe;
