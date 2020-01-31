import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../context/SøknadContext';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';
import { formatDate, formatDateFnr } from '../../utils/dato';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';

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

  const leggTilBarn = () => {
    const fødselsnummer = barnDato && personnummer ? formatDateFnr(barnDato) + personnummer : "";

    const barn = {
      fnr: fødselsnummer,
      personnummer: personnummer,
      alder: differenceInYears(new Date(), barnDato),
      navn: navn,
      fødselsdato: formatDate(barnDato),
      harSammeAdresse: boHosDeg === "ja",
      ufødt: født === "nei",
      nytt: true,
    }

    const nyBarneListe = [...søknad.person.barn, barn];

    settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});

    settÅpenModal(false);
  }

  return (
        <div className="legg-til-barn">
          <Undertittel>Legg til barn</Undertittel>

          <Normaltekst className="spørsmål">Er barnet født?</Normaltekst>

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
        <LeggTilBarnFødt
          settNavn={settNavn}
          settPersonnummer={settPersonnummer}
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
         /> : født === "nei" ? <LeggTilBarnUfødt
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
         /> : null}
          <Hovedknapp className="legg-til-barn-knapp" onClick={leggTilBarn}>Legg til barn</Hovedknapp>
        </div>
  );
};

export default LeggTilBarn;
