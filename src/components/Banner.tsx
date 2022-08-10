import React from 'react';
import styled from 'styled-components/macro';
import LocaleTekst from '../language/LocaleTekst';
import { Heading } from '@navikt/ds-react';

const StyledBanner = styled.header`
  width: 100%;
  height: max-content;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: #c1b5d0;
  border-bottom: 4px solid #826ba1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Banner: React.FC<{ tekstid: string }> = ({ tekstid }) => {
  return (
    <StyledBanner>
      <Heading size="large">
        <LocaleTekst tekst={tekstid} />
      </Heading>
    </StyledBanner>
  );
};

export default Banner;
