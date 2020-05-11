import styled from 'styled-components/macro';
import React, { FC } from 'react';

const StyledNavigeringsKnapper = styled.div`
  padding: 2rem;
  grid-area: knapper;
  display: flex;
  justify-self: center;
  flex-direction: column;

  .avbryt {
    margin-top: 1rem;
  }

  @media all and (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'tilbake'
      'neste'
      'avbryt';
  }

  .treKnapper {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(2, min-content);
    grid-template-areas:
      'tilbake neste'
      'avbryt avbryt';

    @supports (grid-gap: 1rem) {
      grid-gap: 1rem;

      .avbryt {
        margin-top: 0;
      }
    }
    .hideButton {
      display: none;
    }

    .tilbake {
      grid-area: tilbake;
    }

    .neste {
      grid-area: neste;
    }
    .avbryt {
      grid-area: avbryt;
    }
  }
`;

const NavigeringsKnapper: FC<{ classname: string }> = ({
  classname,
  children,
}) => {
  return (
    <StyledNavigeringsKnapper className={classname}>
      {children}
    </StyledNavigeringsKnapper>
  );
};

export default NavigeringsKnapper;
