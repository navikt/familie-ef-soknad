import LocaleTekst from '../../language/LocaleTekst';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledFeilmelding = styled.span`
  color: #ba3a26;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.375rem;
  margin-bottom: 0;
  margin-top: 0.5rem;

  &.gjemFeilmelding {
    display: none;
  }
`;

interface Props {
  className?: string;
  tekstid: string;
}
const Feilmelding: FC<Props> = ({ className, tekstid }) => {
  return (
    <StyledFeilmelding className={className}>
      <LocaleTekst tekst={tekstid} />
    </StyledFeilmelding>
  );
};

export default Feilmelding;
