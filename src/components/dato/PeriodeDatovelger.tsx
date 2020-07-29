import React, { FC, useCallback, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../gruppe/FeltGruppe';
import classNames from 'classnames';
import Feilmelding from '../feil/Feilmelding';
import { strengTilDato } from '../../utils/dato';
import { EPeriode, IPeriode } from '../../models/periode';
import { compareAsc, isEqual } from 'date-fns';

interface Props {
  tekst: string;
  periode: IPeriode;
  settDato: (dato: Date | null, objektnøkkel: string) => void;
  showMonthYearPicker?: boolean;
  datobegrensing?: DatoBegrensning;
}

const PeriodeDatovelgere: FC<Props> = ({
  periode,
  settDato,
  tekst,
  showMonthYearPicker,
  datobegrensing,
}) => {
  const [feilmelding, settFeilmelding] = useState('');

  const sammenlignDatoerOgOppdaterFeilmelding = useCallback(
    (dato: Date, periodenøkkel: EPeriode) => {
      const { fra, til } = periode;
      const fom: Date | undefined =
        periodenøkkel === EPeriode.fra
          ? dato
          : fra.verdi !== ''
          ? strengTilDato(fra.verdi)
          : undefined;

      const tom: Date | undefined =
        periodenøkkel === EPeriode.til
          ? dato
          : til.verdi !== ''
          ? strengTilDato(til.verdi)
          : undefined;

      if (fom && tom) {
        const erFraDatoSenereEnnTilDato = compareAsc(fom, tom) === 1;
        const erDatoerLike = isEqual(fom, tom);

        erFraDatoSenereEnnTilDato &&
          settFeilmelding('datovelger.periode.feilFormat');
        erDatoerLike && settFeilmelding('datovelger.periode.likeDatoer');
        !erFraDatoSenereEnnTilDato && !erDatoerLike && settFeilmelding('');
      }
    },
    [periode]
  );

  const settPeriode = (dato: Date | null, objektnøkkel: EPeriode) => {
    dato !== null && settDato(dato, objektnøkkel);
    dato !== null && sammenlignDatoerOgOppdaterFeilmelding(dato, objektnøkkel);
  };

  return (
    <>
      <FeltGruppe classname={'utenlandsopphold__spørsmål'}>
        <Element>{tekst}</Element>
      </FeltGruppe>
      <div className={'utenlandsopphold__periodegruppe'}>
        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.fra)}
          valgtDato={
            periode.fra.verdi && periode.fra.verdi !== ''
              ? strengTilDato(periode.fra.verdi)
              : undefined
          }
          tekstid={'periode.fra'}
          datobegrensning={
            datobegrensing ? datobegrensing : DatoBegrensning.TidligereDatoer
          }
          showMonthYearPicker={showMonthYearPicker}
        />

        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.til)}
          valgtDato={
            periode.til.verdi && periode.til.verdi !== ''
              ? strengTilDato(periode.til.verdi)
              : undefined
          }
          tekstid={'periode.til'}
          datobegrensning={
            datobegrensing ? datobegrensing : DatoBegrensning.TidligereDatoer
          }
          showMonthYearPicker={showMonthYearPicker}
        />
        {feilmelding && feilmelding !== '' && (
          <div
            className={classNames('datovelger__feilmelding ', {
              gjemFeilmelding: feilmelding === '',
            })}
          >
            <Feilmelding tekstid={feilmelding ? feilmelding : ''} />
          </div>
        )}
      </div>
    </>
  );
};

export default PeriodeDatovelgere;
