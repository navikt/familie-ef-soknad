import React, { FC } from 'react';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { hentUid } from '../../../utils/uuid';

interface Props {
  barn: IBarn;
  settBarnepass: (barnepass: IBarnepass, barnid: string) => void;
}

const BarnepassOrdninger: FC<Props> = ({ barn, settBarnepass }) => {
  const barnepass: IBarnepass = barn.barnepass
    ? barn.barnepass
    : { barnepassordninger: [{ id: hentUid() }] };

  const settBarnepassOrdning = (endretBarnepassordning: IBarnepassOrdning) => {
    const endretBarnepassordninger = barnepass.barnepassordninger.map(
      (ordning) => {
        if (ordning.id === endretBarnepassordning.id) {
          return endretBarnepassordning;
        } else return ordning;
      }
    );
    settBarnepass(
      {
        ...barn.barnepass,
        barnepassordninger: endretBarnepassordninger,
      },
      barn.id
    );
  };
  return (
    <>
      {barnepass?.barnepassordninger.map((barnepassordning) => (
        <BarnepassSpørsmål
          barn={barn}
          barnepassOrdning={barnepassordning}
          settBarnepassOrdning={settBarnepassOrdning}
        />
      ))}
    </>
  );
};

export default BarnepassOrdninger;
