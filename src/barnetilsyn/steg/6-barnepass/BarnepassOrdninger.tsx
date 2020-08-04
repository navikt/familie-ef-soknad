import React, { FC } from 'react';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LeggTilKnapp from '../../../components/knapper/LeggTilKnapp';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Element } from 'nav-frontend-typografi';
import { erBarnepassOrdningerUtfylt } from './hjelper';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { hentUid } from '../../../utils/uuid';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';

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
    <SeksjonGruppe>
      {barnepass?.barnepassordninger.map((barnepassordning) => (
        <BarnepassSpørsmål
          barn={barn}
          barnepassOrdning={barnepassordning}
          settBarnepassOrdning={settBarnepassOrdning}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          fjernBarnepassOrdning={fjernBarnepassOrdning}
        />
      ))}
      {erBarnepassOrdningerUtfylt(barnepass.barnepassordninger) && (
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
      )}
    </SeksjonGruppe>
  );
};

export default BarnepassOrdninger;
