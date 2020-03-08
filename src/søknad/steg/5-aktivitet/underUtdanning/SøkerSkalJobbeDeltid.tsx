import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/aktivitet/utdanning';
import { Textarea } from 'nav-frontend-skjema';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  utdanning: IUnderUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}

const SøkerSkalJobbeDeltid: React.FC<Props> = ({
  utdanning,
  oppdaterUtdanning,
}) => {
  const intl = useIntl();

  const settMålMedUtdanning = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    oppdaterUtdanning(
      EUtdanning.målMedUtdanning,
      målMedUtdanningLabel,
      e.currentTarget.value
    );
  };

  const settInputFelt = (
    nøkkel: EUtdanning,
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    oppdaterUtdanning(nøkkel, label, e.currentTarget.value);
  };

  const arbeidsmengdeLabel = hentTekst('utdanning.label.arbeidsmengde', intl);
  const målMedUtdanningLabel = hentTekst('utdanning.spm.mål', intl);

  return (
    <>
      <KomponentGruppe>
        <InputLabelGruppe
          label={arbeidsmengdeLabel}
          nøkkel={EUtdanning.arbeidsmengde}
          type={'number'}
          bredde={'XS'}
          settInputFelt={(e) =>
            settInputFelt(EUtdanning.arbeidsmengde, arbeidsmengdeLabel, e)
          }
          beskrivendeTekst={'%'}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <Textarea
          label={målMedUtdanningLabel}
          value={
            utdanning.målMedUtdanning?.verdi
              ? utdanning.målMedUtdanning?.verdi
              : ''
          }
          maxLength={1000}
          onChange={(e) => settMålMedUtdanning(e)}
        />
      </KomponentGruppe>
    </>
  );
};

export default SøkerSkalJobbeDeltid;
