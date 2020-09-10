import React from 'react';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { heltidEllerDeltidSpm } from './UtdanningConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';
interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}
const ErUtdanningenPåHeltidEllerDeltid: React.FC<Props> = ({
  utdanning,
  settUtdanning,
}) => {
  const intl = useIntl();

  const settMultiSpørsmål = (spørsmål: ISpørsmål, svar: ISvar) => {
    const søkerVilStudereHeltid = spørsmål.svaralternativer.find(
      (svarsalternativ) => svarsalternativ.svar_tekstid === svar.svar_tekstid
    );
    if (
      (spørsmål.søknadid === EUtdanning.heltidEllerDeltid &&
        søkerVilStudereHeltid &&
        utdanning.målMedUtdanning) ||
      utdanning.arbeidsmengde
    ) {
      delete utdanning.arbeidsmengde;
      delete utdanning.målMedUtdanning;
    }
    settUtdanning({
      ...utdanning,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
  };
  return (
    <KomponentGruppe>
      <MultiSvarSpørsmål
        spørsmål={heltidEllerDeltidSpm}
        settSpørsmålOgSvar={settMultiSpørsmål}
        valgtSvar={utdanning.heltidEllerDeltid?.verdi}
        className="toKorteSvar"
      />
    </KomponentGruppe>
  );
};

export default ErUtdanningenPåHeltidEllerDeltid;
