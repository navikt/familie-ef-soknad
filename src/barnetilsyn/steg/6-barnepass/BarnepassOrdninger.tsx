import React, { FC } from 'react';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { hentUid } from '../../../utils/uuid';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Element } from 'nav-frontend-typografi';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { useIntl } from 'react-intl';
import LeggTilKnapp from '../../../components/knapper/LeggTilKnapp';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

interface Props {
  barn: IBarn;
  settBarnepass: (barnepass: IBarnepass, barnid: string) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const BarnepassOrdninger: FC<Props> = ({
  barn,
  settBarnepass,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();
  const barnepass: IBarnepass = barn.barnepass
    ? barn.barnepass
    : { barnepassordninger: [{ id: hentUid() }] };
  const leggTilLabel = hentBarnNavnEllerBarnet(
    barn,
    'barnepass.label.leggTilOrdning',
    intl
  );

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

  const leggTilBarnepassordning = () => {
    const endretBarnepassordninger = barnepass.barnepassordninger;
    endretBarnepassordninger.push({ id: hentUid() });
    settBarnepass(
      { ...barn.barnepass, barnepassordninger: endretBarnepassordninger },
      barn.id
    );
  };

  const fjernBarnepassOrdning = (barnepassordning: IBarnepassOrdning) => {
    const barnepassordninger = barn.barnepass?.barnepassordninger;
    if (barnepassordninger && barnepassordninger.length > 1) {
      const endretBarnepassOrdning = barnepassordninger?.filter(
        (ordning) => ordning.id !== barnepassordning.id
      );
      settBarnepass(
        { ...barnepass, barnepassordninger: endretBarnepassOrdning },
        barn.id
      );
    }
  };

  return (
    <>
      {barnepass?.barnepassordninger.map((barnepassordning, index) => (
        <BarnepassSpørsmål
          key={barnepassordning.id}
          barn={barn}
          barnepassOrdning={barnepassordning}
          settBarnepassOrdning={settBarnepassOrdning}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          fjernBarnepassOrdning={fjernBarnepassOrdning}
        />
      ))}
      <KomponentGruppe>
        <FeltGruppe>
          <Element>{leggTilLabel}</Element>
        </FeltGruppe>
        <FeltGruppe>
          <LeggTilKnapp onClick={() => leggTilBarnepassordning()}>
            {intl.formatMessage({ id: 'barnepass.knapp.leggTilOrdning' })}
          </LeggTilKnapp>
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default BarnepassOrdninger;
