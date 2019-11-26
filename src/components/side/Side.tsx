import React from 'react';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { ISide } from '../../models/side';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import TilbakeKnapp from '../TilbakeKnapp';

const Side: React.FC<ISide> = ({
  tittel,
  id,
  steg,
  avbrytPath,
  nestePath,
  tilbakePath,
  children,
}) => {
  const settNyPath = (nyPath: string) => {
    console.log(nyPath);
  };

  return (
    <div className={'side'}>
      <Stegindikator
        autoResponsiv={true}
        aktivtSteg={1}
        steg={[
          { label: 'First', index: 1 },
          { label: 'First', index: 2 },
          { label: 'First', index: 3 },
        ]}
      />
      <TilbakeKnapp
        path={tilbakePath}
        onClick={() => settNyPath(tilbakePath)}
      />
      <Innholdstittel>{tittel}</Innholdstittel>
      <main className={'side__innhold'}>{children}</main>
      <div className={'side__knapper'}>
        <Hovedknapp onChange={() => settNyPath(nestePath)}>
          {'Neste'}
        </Hovedknapp>
        <Flatknapp onChange={() => settNyPath(avbrytPath)}>
          {'Avbryt'}
        </Flatknapp>
      </div>
    </div>
  );
};

export default Side;
