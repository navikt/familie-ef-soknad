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

  const settDato = (dato: Date | null) => {
    dato !== null &&
      oppdaterArbeidsgiver(
        EArbeidsgiver.sluttdato,
        intl.formatMessage({ id: sluttdatoTekstid }),
        dato
      );
  };

  const settHarSluttDato = (spørsmål: ISpørsmål, svar: boolean) => {
    oppdaterArbeidsgiver(
      EArbeidsgiver.harSluttDato,
      intl.formatMessage({ id: spørsmål.tekstid }),
      svar
    );
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
