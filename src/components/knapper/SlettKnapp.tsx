import React from 'react';
import styled from 'styled-components';
import LocaleTekst from '../../language/LocaleTekst';
import { ReactComponent as Slett } from '../../assets/slett.svg';

const StyledSlettKnapp = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  text-decoration: underline;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.375rem;
  font-weight: 400;
  color: #0067c5;

  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  & > span {
    padding-right: 5px;
  }

  svg {
    height: 16px;
    width: 16px;
  }
`;

interface Props {
  className?: string;
  tekstid: string;
  onClick: () => void;
}

const SlettKnapp: React.FC<Props> = ({ tekstid, onClick, className }) => {
  return (
    <StyledSlettKnapp className={className} onClick={() => onClick()}>
      <span>
        <LocaleTekst tekst={tekstid} />
      </span>
      <Slett />
    </StyledSlettKnapp>
  );
};

export default SlettKnapp;
