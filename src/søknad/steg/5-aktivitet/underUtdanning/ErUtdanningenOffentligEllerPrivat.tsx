import React from 'react';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { privatEllerOffentligSpm } from './UtdanningConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { IUnderUtdanning } from '../../../../models/steg/aktivitet/utdanning';
import { ISpørsmål, ISvar } from '../../../../models/spørsmalogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';
interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}
const ErUtdanningenOffentligEllerPrivat: React.FC<Props> = ({
  utdanning,
  settUtdanning,
}) => {
  const intl = useIntl();

  const settMultiSpørsmål = (spørsmål: ISpørsmål, svar: ISvar) => {
    settUtdanning({
      ...utdanning,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
  };
  return (
    <KomponentGruppe>
      <MultiSvarSpørsmål
        spørsmål={privatEllerOffentligSpm}
        settSpørsmålOgSvar={settMultiSpørsmål}
        valgtSvar={utdanning.offentligEllerPrivat?.verdi}
        toKorteSvar={true}
      />
    </KomponentGruppe>
  );
};

export default ErUtdanningenOffentligEllerPrivat;
