import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import useSøknadContext from '../../context/SøknadContext';
import DatePicker from 'react-datepicker';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';
import LeggTilBarnModal from './LeggTilBarnModal';
import { Input } from 'nav-frontend-skjema';

interface Props {
    settÅpenModal: Function;
}

const LeggTilBarn: React.FC<Props> = ( { settÅpenModal }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(new Date());
  const [født, settBarnFødt] = useState("");
  const [navn, settNavn] = useState("Barn");
  const [personnummer, settPersonnummer] = useState("");
  const [boHosDeg, settBoHosDeg] = useState("");

  const settDato = (date: Date | null): void => {
    date !== null && settBarnDato(date);
  };

  const settFødt = (event: any) => {
    settBarnFødt(event.target.value);
  }

  const settBo = (event: any) => {
    settBoHosDeg(event.target.value);
  }

  const barn = {
      fnr: "0123456789",
      alder: differenceInYears(new Date(), barnDato),
      navn: navn,
      fødselsdato: barnDato.toString(),
      harSammeAdresse: boHosDeg === "ja",
      nytt: true,
  }

  const leggTilBarn = () => {
    const nyBarneListe = [...søknad.person.barn, barn];

    settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});

    settÅpenModal(false);
  }

  return (
        <div className="legg-til-barn">
          <h2>Legg til barn</h2>

          <Normaltekst>Er barnet født?</Normaltekst>

          <div className="radiogruppe-2">
          <RadioPanel
                key={"ja"}
                name={"halla"}
                label="Ja"
                value={"ja"}
                checked={født === "ja"}
                onChange={(e) => settFødt(e)}
            />
          <RadioPanel
                key={"nei"}
                name={"halla"}
                label="Nei"
                value={"nei"}
                checked={født === "nei"}
                onChange={(e) => settFødt(e)}
            />
            </div>
        {født === "ja" ?
        <>
        <Input onChange={(e) => settNavn(e.target.value)} label="Barnets fulle navn, om dette er bestemt" />

          <Normaltekst>Fødselsdato</Normaltekst>
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
            <Input onChange={(e) => settPersonnummer(e.target.value)} label="Personnummer. Kun hvis barnet har fått." />

            <Normaltekst>Bor barnet hos deg?</Normaltekst>

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

            </> : null}
          <Knapp onClick={leggTilBarn}>Legg til</Knapp>
        </div>
  );
};

export default LeggTilBarn;
