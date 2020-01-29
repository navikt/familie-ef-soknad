import React from 'react';
import styled from 'styled-components';

interface Props {
  erBesvart: boolean;
}

const StyledInnholdWrapper = styled.div`
  padding: 1rem 0 1rem 0;
`;

const InnholdWrapper: React.FC<Props> = ({ erBesvart, children }) => {
  return (
    <>
      {erBesvart ? (
        <StyledInnholdWrapper> {children} </StyledInnholdWrapper>
      ) : null}
    </>
  );
};

export default InnholdWrapper;
