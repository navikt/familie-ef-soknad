import React, { FC } from 'react';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { hentUid } from '../../../utils/uuid';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { Element } from 'nav-frontend-typografi';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { useIntl } from 'react-intl';
import LeggTilKnapp from '../../../components/knapper/LeggTilKnapp';

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
  const tomBarnepassOrdning = { id: hentUid() };
  const barnepass: IBarnepass = barn.barnepass
    ? barn.barnepass
    : { barnepassordninger: [tomBarnepassOrdning] };
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
    endretBarnepassordninger.push(tomBarnepassOrdning);
    settBarnepass(
      { ...barn.barnepass, barnepassordninger: endretBarnepassordninger },
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
          settDokumentasjonsbehov={settDokumentasjonsbehov}
        />
      ))}
      <KomponentGruppe>
        <Element>{leggTilLabel}</Element>
        <LeggTilKnapp onClick={() => leggTilBarnepassordning()}>
          {intl.formatMessage({ id: 'barnepass.knapp.leggTilOrdning' })}
        </LeggTilKnapp>
      </KomponentGruppe>
    </>
  );
};

export default BarnepassOrdninger;
