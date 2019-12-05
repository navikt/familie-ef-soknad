import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';

export enum knapptype {
  Hoved = 'Hovedknapp',
  Flat = 'Flatknapp',
}

interface Props {
  tekstid: string;
  type: knapptype;
  nyPath: string;
}

const NavKnapp: FC<Props> = ({ tekstid, nyPath, type }) => {
  return (
    <Link to={nyPath} className={'navknapp'}>
      {type === knapptype.Hoved ? (
        <Hovedknapp>{tekstid}</Hovedknapp>
      ) : (
        <Flatknapp>{tekstid}</Flatknapp>
      )}
    </Link>
  );
};

export default NavKnapp;
