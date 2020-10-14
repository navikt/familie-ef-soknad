import React from 'react';
import add from '../../assets/add.svg';
import { Flatknapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';
import './LeggTilKnapp.less';

interface Props {
  onClick: () => void;
}

//TODO FIKS STYLING
const LeggTilKnapp: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Flatknapp className="lenke-knapp" onClick={onClick}>
      <img alt="Legg til" src={add} />
      <Element>{children}</Element>
    </Flatknapp>
  );
};

export default LeggTilKnapp;
