import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { harDuSluttdato } from './ArbeidsgiverConfig';
import { ISpørsmål } from '../../../../models/spørsmal';

import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/steg/arbeidssituasjon/arbeidsgiver';

interface Props {
  arbeidsgiver: IArbeidsgiver;
  settArbeidsgiver: (arbeidsgiver: IArbeidsgiver) => void;
}

const HarSøkerSluttdato: React.FC<Props> = ({
  arbeidsgiver,
  settArbeidsgiver,
}) => {
  const intl = useIntl();

  const settDato = (dato: Date | null) => {
    dato !== null &&
      settArbeidsgiver({
        ...arbeidsgiver,
        [EArbeidsgiver.sluttdato]: {
          label: intl.formatMessage({ id: sluttdatoTekstid }),
          verdi: dato,
        },
      });
  };

  const settHarSluttDato = (spørsmål: ISpørsmål, svar: boolean) => {
    const harSluttDatoFelt = {
      label: intl.formatMessage({ id: spørsmål.tekstid }),
      verdi: svar,
    };
    if (svar === false && arbeidsgiver.sluttdato) {
      const endretArbeidsgiver = arbeidsgiver;
      delete endretArbeidsgiver.sluttdato;
      settArbeidsgiver({
        ...endretArbeidsgiver,
        [EArbeidsgiver.harSluttDato]: harSluttDatoFelt,
      });
    } else {
      settArbeidsgiver({
        ...arbeidsgiver,
        [EArbeidsgiver.harSluttDato]: harSluttDatoFelt,
      });
    }
  };

  const sluttdatoTekstid = 'arbeidsforhold.datovelger.sluttdato';

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <JaNeiSpørsmål
            spørsmål={harDuSluttdato}
            onChange={settHarSluttDato}
            valgtSvar={arbeidsgiver.harSluttDato?.verdi}
          />
        </FeltGruppe>
        {arbeidsgiver.harSluttDato?.verdi === true && (
          <FeltGruppe>
            <Datovelger
              valgtDato={arbeidsgiver.sluttdato?.verdi}
              tekstid={sluttdatoTekstid}
              datobegrensning={DatoBegrensning.FremtidigeDatoer}
              settDato={(e) => settDato(e)}
            />
          </FeltGruppe>
        )}
      </KomponentGruppe>
    </>
  );
};

export default HarSøkerSluttdato;
