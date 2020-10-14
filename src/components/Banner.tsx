import React from 'react';
import styled from 'styled-components/macro';
import { Innholdstittel } from 'nav-frontend-typografi';
import LocaleTekst from '../language/LocaleTekst';

const StyledBanner = styled.header`
  width: 100%;
  height: 64px;
  background-color: #c1b5d0;
  border-bottom: 4px solid #826ba1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Banner: React.FC<{ tekstid: string }> = ({ tekstid }) => {
  return (
    <StyledBanner>
      <Innholdstittel>
        <LocaleTekst tekst={tekstid} />
      </Innholdstittel>
    </StyledBanner>
  );
};

export default Banner;
