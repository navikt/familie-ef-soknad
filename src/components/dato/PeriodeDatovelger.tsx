import React, { FC } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import { IPeriode } from '../../models/søknad';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../gruppe/FeltGruppe';
import classNames from 'classnames';
import Feilmelding from '../feil/Feilmelding';

interface Props {
  tekstid: string;
  periode: IPeriode;
  settDato: (dato: Date | null, objektnøkkel: string) => void;
  className?: string;
  feilmelding?: string;
}

const PeriodeDatovelgere: FC<Props> = ({
  periode,
  settDato,
  tekstid,
  className,
  feilmelding,
}) => {
  return (
    <>
      <FeltGruppe classname={'utenlandsopphold__spørsmål'}>
        <Element>
          <LocaleTekst tekst={tekstid} />
        </Element>
      </FeltGruppe>
      <div className={'utenlandsopphold__periodegruppe'}>
        <Datovelger
          settDato={(e) => settDato(e, 'fra')}
          valgtDato={periode.fra ? periode.fra.verdi : undefined}
          tekstid={'periode.fra'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />

        <Datovelger
          settDato={(e) => settDato(e, 'til')}
          valgtDato={periode.til ? periode.til.verdi : undefined}
          tekstid={'periode.til'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />
        {feilmelding !== '' ? (
          <div
            className={classNames('datovelger__feilmelding ', {
              gjemFeilmelding: feilmelding === '',
            })}
          >
            <Feilmelding tekstid={feilmelding ? feilmelding : ''} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PeriodeDatovelgere;
