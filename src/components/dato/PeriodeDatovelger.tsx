import React, { FC, useCallback, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../gruppe/FeltGruppe';
import classNames from 'classnames';
import Feilmelding from '../feil/Feilmelding';
import { dagensDato, strengTilDato } from '../../utils/dato';
import subDays from 'date-fns/subDays';
import { compareAsc, isEqual } from 'date-fns';
import { IPeriode } from '../../models/periode';

interface Props {
  tekstid: string;
  periode: IPeriode;
  settDato: (dato: Date | null, objektnøkkel: string) => void;
  showMonthYearPicker?: boolean;
}

const PeriodeDatovelgere: FC<Props> = ({
  periode,
  settDato,
  tekstid,
  showMonthYearPicker,
}) => {
  const [feilmelding, settFeilmelding] = useState('');

  const sammenlignDatoerOgOppdaterFeilmelding = useCallback(
    (dato: Date, periodenøkkel: 'fra' | 'til') => {
      const fom: Date =
        periodenøkkel === 'fra' ? dato : strengTilDato(periode.fra.verdi);
      const tom: Date =
        periodenøkkel === 'til' ? dato : strengTilDato(periode.til.verdi);
      const erFraDatoSenereEnnTilDato = compareAsc(fom, tom) === 1;
      const erDatoerLike = isEqual(fom, tom);
      erFraDatoSenereEnnTilDato &&
        settFeilmelding('datovelger.periode.feilFormat');
      erDatoerLike && settFeilmelding('datovelger.periode.likeDatoer');
      !erFraDatoSenereEnnTilDato && !erDatoerLike && settFeilmelding('');
    },
    [periode]
  );

  const settPeriode = (dato: Date | null, objektnøkkel: 'til' | 'fra') => {
    dato !== null && settDato(dato, objektnøkkel);
    dato !== null && sammenlignDatoerOgOppdaterFeilmelding(dato, objektnøkkel);
  };

  return (
    <>
      <FeltGruppe classname={'utenlandsopphold__spørsmål'}>
        <Element>
          <LocaleTekst tekst={tekstid} />
        </Element>
      </FeltGruppe>
      <div className={'utenlandsopphold__periodegruppe'}>
        <Datovelger
          settDato={(e) => settPeriode(e, 'fra')}
          valgtDato={
            periode.fra.verdi ? periode.fra.verdi : subDays(dagensDato, 1)
          }
          tekstid={'periode.fra'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          showMonthYearPicker={showMonthYearPicker}
        />

        <Datovelger
          settDato={(e) => settPeriode(e, 'til')}
          valgtDato={periode.til.verdi ? periode.til.verdi : dagensDato}
          tekstid={'periode.til'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
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
