import React from 'react';
import { AddCircleFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
}

const LeggTilKnapp: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button variant="tertiary" onClick={onClick} icon={<AddCircleFilled />}>
      {children}
    </Button>
  );
};

export default LeggTilKnapp;
