import React from 'react';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import { heltidEllerDeltidSpm } from '../UtdanningConfig';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../../models/arbeidssituasjon/utdanning';
import { ISpørsmål } from '../../../../../models/spørsmal';
import { hentTekst } from '../../../../../utils/søknad';
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

  const settMultiSpørsmål = (spørsmål: ISpørsmål, svar: string) => {
    const søkerVilStudereHeltid = spørsmål.svaralternativer.find(
      (svarsalternativ) =>
        hentTekst(svarsalternativ.svar_tekstid, intl) === svar
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
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };
  return (
    <KomponentGruppe>
      <MultiSvarSpørsmål
        spørsmål={heltidEllerDeltidSpm}
        settSpørsmålOgSvar={settMultiSpørsmål}
        valgtSvar={utdanning.heltidEllerDeltid?.verdi}
        toKorteSvar={true}
      />
    </KomponentGruppe>
  );
};

export default ErUtdanningenPåHeltidEllerDeltid;
