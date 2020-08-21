import React, { FC } from 'react';
import styled from 'styled-components';

const StyledEkspanderbarOppsummering = styled.div`
  .listeelement {
    .spørsmål-og-svar:first-of-type {
      margin-top: 1rem;
    }
    hr {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }

  .disclaimer {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .ekspanderbartPanel {
    border: none;
    border-bottom: 1px solid #3e3832;
    border-radius: 0px;
  }
  .seksjon {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .oppsummering-barn {
    hr {
      margin-top: 2rem;
    }

    .typo-element {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }

  .oppsummering-bosituasjon {
    .seksjon-samboer {
      margin-top: 2rem;
    }
  }
`;
interface Props {
  className?: string;
}
const EkspanderbarOppsummering: FC<Props> = ({ className, children }) => {
  return (
    <StyledEkspanderbarOppsummering className={className}>
      {children}
    </StyledEkspanderbarOppsummering>
  );
};

export default EkspanderbarOppsummering;
