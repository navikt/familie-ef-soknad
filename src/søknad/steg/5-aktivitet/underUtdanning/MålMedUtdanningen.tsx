import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import { Textarea } from 'nav-frontend-skjema';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  utdanning: IUnderUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}

const MålMedUtdanningen: React.FC<Props> = ({
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

  const målMedUtdanningLabel = hentTekst('utdanning.spm.mål', intl);

  return (
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
  );
};

export default MålMedUtdanningen;
