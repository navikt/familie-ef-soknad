import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { harDuSluttdato } from './ArbeidsgiverConfig';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';

import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';

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
          label: hentTekst(sluttdatoTekstid, intl),
          verdi: dato,
        },
      });
  };

  const settHarSluttDato = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    const harSluttDatoFelt = {
      spørsmålid: spørsmål.søknadid,
      svarid: valgtSvar.id,
      label: hentTekst(spørsmål.tekstid, intl),
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
