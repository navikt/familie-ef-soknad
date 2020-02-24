import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { harDuSluttdato } from './ArbeidsgiverConfig';
import { ISpørsmål } from '../../../../models/spørsmal';
import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/arbeidssituasjon';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';

interface Props {
  arbeidsgiver: IArbeidsgiver;
  oppdaterArbeidsgiver: (
    objektnøkkel: EArbeidsgiver | string,
    label: string,
    verdi: any
  ) => void;
}

const HarSøkerSluttdato: React.FC<Props> = ({
  arbeidsgiver,
  oppdaterArbeidsgiver,
}) => {
  const intl = useIntl();

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <JaNeiSpørsmål
            spørsmål={harDuSluttdato}
            onChange={(spørsmål: ISpørsmål, svar: boolean) =>
              oppdaterArbeidsgiver(
                EArbeidsgiver.harSluttDato,
                intl.formatMessage({ id: spørsmål.tekstid }),
                svar
              )
            }
            valgtSvar={arbeidsgiver.harSluttDato?.verdi}
          />
        </FeltGruppe>
        <FeltGruppe>
          <Datovelger
            valgtDato={arbeidsgiver.sluttdato?.verdi}
            tekstid={'arbeidsforhold.datovelger.sluttdato'}
            datobegrensning={DatoBegrensning.FremtidigeDatoer}
            settDato={(dato: Date | null) =>
              oppdaterArbeidsgiver(
                EArbeidsgiver.sluttdato,
                'arbeidsforhold.datovelger.sluttdato',
                dato
              )
            }
          />
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default HarSøkerSluttdato;
