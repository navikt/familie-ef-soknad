import React from 'react';
import styled from 'styled-components';
import { Sidetittel } from 'nav-frontend-typografi';
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

const Banner: React.FC<any> = () => {
  return (
    <StyledBanner>
      <Sidetittel>
        <LocaleTekst tekst={'banner.tittel'} />
      </Sidetittel>
    </StyledBanner>
  );
};

export default Banner;
