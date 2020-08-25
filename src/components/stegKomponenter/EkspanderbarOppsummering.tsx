import React, { FC } from 'react';
import styled from 'styled-components';

const StyledEkspanderbarOppsummering = styled.div`
  .typo-ingress {
    padding-bottom: 1rem;
  }
  .spørsmål-og-svar {
    margin-top: 2rem;
    .typo-normal {
      margin-top: 1rem;
    }
  }
  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
