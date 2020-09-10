import React from 'react';
import styled from 'styled-components/macro';
import add from '../../assets/add.svg';
import { Element } from 'nav-frontend-typografi';

const StyledLeggTilKnapp = styled.button`
  .lenke-knapp {
    display: flex;
    margin-top: 0;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    padding-top: 1rem;

    .typo-element {
      margin-left: 1rem;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #19548a;

      &:hover {
        text-decoration: none;
        cursor: pointer;
        background-color: #254b6d;
        color: white;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

interface Props {
  onClick: any;
}

const LeggTilKnapp: React.FC<Props> = ({ onClick, children }) => {
  return (
    <StyledLeggTilKnapp>
      <div className="lenke-knapp" onClick={onClick}>
        <img alt="Legg til" src={add} />
        <Element>{children}</Element>
      </div>
    </StyledLeggTilKnapp>
  );
};

export default LeggTilKnapp;
