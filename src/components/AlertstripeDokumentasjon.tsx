import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as FilIkon } from '../assets/fil.svg';
import { Normaltekst } from 'nav-frontend-typografi';

const StyledAlertstripe = styled.div`
  padding-top: 0.75rem;
  display: flex;
  align-content: center;

  .ikon {
    margin-right: 0.75rem;
    display: flex;
    top: 1rem;
    flex-shrink: 0;
  }
  .tekst {
    margin: auto 0;
    max-width: 37.5rem;
    display: block;
    flex: 1 1;
  }
`;

const AlertStripeDokumentasjon: FC = ({ children }) => {
  return (
    <StyledAlertstripe>
      <FilIkon className={'ikon'} />
      <div className={'tekst'}>
        <Normaltekst>{children}</Normaltekst>
      </div>
    </StyledAlertstripe>
  );
};

export default AlertStripeDokumentasjon;
