import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  utdanning: IUnderUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}

const StudieArbeidsmengde: React.FC<Props> = ({
  utdanning,
  oppdaterUtdanning,
}) => {
  const intl = useIntl();

  const settInputFelt = (
    nøkkel: EUtdanning,
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    oppdaterUtdanning(nøkkel, label, e.currentTarget.value);
  };

  const arbeidsmengdeLabel = hentTekst('utdanning.label.arbeidsmengde', intl);

  return (
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
        value={
          utdanning?.arbeidsmengde?.verdi ? utdanning?.arbeidsmengde?.verdi : ''
        }
      />
    </KomponentGruppe>
  );
};

export default StudieArbeidsmengde;
