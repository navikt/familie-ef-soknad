import styled from 'styled-components/macro';

export const StyledOppsummering = styled.div`
  .deloverskrift {
    margin-top: 2rem;
  }

  .spørsmål-og-svar {
    margin-top: 2rem;
    .typo-normal {
      margin-top: 0.5rem;
    }
  }

  .person-info {
    margin-bottom: 1rem;
  }
`;

export const StyledOppsummeringForBarn = styled.section`
  margin-top: 3rem;

  .spørsmål-og-svar {
    margin-top: 2rem;
    .typo-normal {
      margin-top: 0.5rem;
    }
  }
`;

export const StyledOppsummeringMedUndertitler = styled.div`
  .spørsmål-og-svar {
    margin-top: 1rem;
    .typo-normal {
      margin-top: 0.5rem;
    }
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export const SeksjonSpacingTop = styled.div`
  margin-top: 3rem;
`;

export const SeksjonSpacingBottom = styled.div`
  margin-bottom: 3rem;
`;
