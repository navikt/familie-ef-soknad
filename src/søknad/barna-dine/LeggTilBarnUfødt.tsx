import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import useSøknadContext from '../../context/SøknadContext';
import DatePicker from 'react-datepicker';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';

interface Props {
    settBo: Function;
    boHosDeg: string;
    settDato: Function;
    barnDato: Date;
}

const LeggTilBarnUfødt: React.FC<Props> = ( { settBo, boHosDeg, settDato, barnDato }) => {
  return (
    <>

      <Normaltekst>Termindato</Normaltekst>
      <div className="barn-datovelger">
      <div className={'datepicker__container'}>
        <DatePicker
                onChange={(e) => settDato(e)}
                selected={barnDato}
                dateFormat={'dd.MM.yyyy'}
                className={'datovelger__input'}
            />
            </div>
        </div>
        <br/>

        <Normaltekst>Skal barnet bo hos deg?</Normaltekst>

      <div className="radiogruppe-2">

      <RadioPanel
            key={"ja"}
            name={"radio-bosted"}
            label="Ja"
            value={"ja"}
            checked={boHosDeg === "ja"}
            onChange={(e) => settBo(e)}
        />
        <RadioPanel
            key={"nei"}
            name={"radio-bosted"}
            label="Nei"
            value={"nei"}
            checked={boHosDeg === "nei"}
            onChange={(e) => settBo(e)}
        />
        </div>

        </>
  );
};

export default LeggTilBarnUfødt;
