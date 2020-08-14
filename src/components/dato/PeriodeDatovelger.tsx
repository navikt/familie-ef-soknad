import React, { FC, useCallback, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import FeltGruppe from '../gruppe/FeltGruppe';
import classNames from 'classnames';
import Feilmelding from '../feil/Feilmelding';
import { strengTilDato } from '../../utils/dato';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { compareAsc, isEqual } from 'date-fns';

interface Props {
  tekst: string;
  periode: IPeriode;
  fomTekstid?: string;
  tomTekstid?: string;
  settDato: (dato: Date | null, objektnøkkel: EPeriode) => void;
  showMonthYearPicker?: boolean;
  datobegrensing?: DatoBegrensning;
  onValidate?: (isValid: boolean) => void;
}

const PeriodeDatovelgere: FC<Props> = ({
  periode,
  settDato,
  tekst,
  fomTekstid,
  tomTekstid,
  showMonthYearPicker,
  datobegrensing,
  onValidate,
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

        if (erFraDatoSenereEnnTilDato) {
          settFeilmelding('datovelger.periode.feilFormat');
          onValidate && onValidate(false);
        } else if (erDatoerLike) {
          settFeilmelding('datovelger.periode.likeDatoer');
          onValidate && onValidate(false);
        } else {
          settFeilmelding('');
          onValidate && onValidate(true);
        }
      } else {
        settFeilmelding('');
        onValidate && onValidate(true);
      }
    },
    [periode, onValidate]
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
          tekstid={fomTekstid ? fomTekstid : 'periode.fra'}
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
          tekstid={tomTekstid ? tomTekstid : 'periode.til'}
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
