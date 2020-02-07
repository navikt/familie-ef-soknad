import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import DatePicker from 'react-datepicker';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
    settBo: Function;
    boHosDeg: string;
    settDato: Function;
    barnDato: Date;
}

const LeggTilBarnUfødt: React.FC<Props> = ( { settBo, boHosDeg, settDato, barnDato }) => {
  return (
    <>
    <div className="termindato">
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
        </div>

      <div className="bo-hos-deg-spørsmål">
        <Normaltekst>Skal barnet bo hos deg?</Normaltekst>
        <div className="radiogruppe-2-svar">
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
        </div>
        </>
  );
};

export default LeggTilBarnUfødt;
