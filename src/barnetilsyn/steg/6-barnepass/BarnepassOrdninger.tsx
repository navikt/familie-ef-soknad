import React, { FC } from 'react';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { hentUid } from '../../../utils/uuid';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { Element } from 'nav-frontend-typografi';

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
      <KomponentGruppe>
        <Element>
          <LocaleTekst tekst={'barnepass.label.leggTilOrdning'} />
        </Element>
      </KomponentGruppe>
    </>
  );
};

export default BarnepassOrdninger;
