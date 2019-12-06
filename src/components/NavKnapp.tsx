import React, { FC } from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  return (
    <div className={'navknapp'}>
      {type === knapptype.Hoved ? (
        <Hovedknapp onClick={() => history.push(nyPath)}>{tekstid}</Hovedknapp>
      ) : (
        <Flatknapp onClick={() => history.push(nyPath)}>{tekstid}</Flatknapp>
      )}
    </div>
  );
};

export default NavKnapp;
