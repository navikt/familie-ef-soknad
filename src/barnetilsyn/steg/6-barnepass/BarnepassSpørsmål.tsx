import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { IBarn } from '../../../models/barn';
import { IBarnepass, IBarnepassOrdning } from '../../models/barnepass';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { HvaSlagsBarnepassOrdningSpm } from './BarnepassConfig';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { useIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../utils/søknad';

interface Props {
  barn: IBarn;
  barnepassOrdning: IBarnepassOrdning;
  settBarnepassOrdning: (barnepassOrdning: IBarnepassOrdning) => void;
}

const BarnepassSpørsmål: FC<Props> = ({
  barn,
  settBarnepassOrdning,
  barnepassOrdning,
}) => {
  const intl = useIntl();
  const { hvaSlagsBarnepassOrdning } = barnepassOrdning;

  const spørsmålTekstBarnepassOrdning = hentBarnNavnEllerBarnet(
    barn,
    HvaSlagsBarnepassOrdningSpm.tekstid,
    intl
  );

  const settSpørsmålFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    settBarnepassOrdning({
      ...barnepassOrdning,
      hvaSlagsBarnepassOrdning: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          spørsmål={HvaSlagsBarnepassOrdningSpm}
          spørsmålTekst={spørsmålTekstBarnepassOrdning}
          settSpørsmålOgSvar={settSpørsmålFelt}
          valgtSvar={hvaSlagsBarnepassOrdning?.verdi}
        />
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default BarnepassSpørsmål;
