import React from 'react';
import add from '../../assets/add.svg';
import './LeggTilKnapp.less';
import { Button, Label } from '@navikt/ds-react';

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
}

const LeggTilKnapp: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button variant="tertiary" className="lenke-knapp" onClick={onClick}>
      <img alt="Legg til" src={add} />
      <Label>{children}</Label>
    </Button>
  );
};

export default LeggTilKnapp;
