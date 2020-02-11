import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../../context/SøknadContext';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';
import { formatDate, formatDateFnr, dagensDato } from '../../../utils/dato';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
const uuidv4 = require('uuid/v4');

interface Props {
    settÅpenModal: Function;
}

const LeggTilBarn: React.FC<Props> = ( { settÅpenModal }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(dagensDato);
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

  const tilbakestillFelt = () => {
    settBarnDato(dagensDato);
    settNavn("Barn");
    settPersonnummer("");
    settBoHosDeg("");
  }

  const leggTilBarn = () => {
    const fødselsnummer = barnDato && personnummer ? formatDateFnr(barnDato) + personnummer : "";

    const barn = {
      fnr: fødselsnummer,
      personnummer: personnummer,
      alder: differenceInYears(dagensDato, barnDato),
      navn: navn,
      fødselsdato: formatDate(barnDato),
      harSammeAdresse: boHosDeg === "ja",
      ufødt: født === "nei",
      lagtTil: true,
      id: uuidv4(),
    }

    const nyBarneListe = [...søknad.person.barn, barn];

    settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});

    settÅpenModal(false);
  }

  return (
        <Seksjonsgruppe className="legg-til-barn">
          <Undertittel>Legg til barn</Undertittel>

          <KomponentGruppe>
          <Element>Er barnet født?</Element>

          <div className="radiogruppe-2-svar">
          <RadioPanel
                key={"ja"}
                name={"radio-født"}
                label="Ja"
                value={"ja"}
                checked={født === "ja"}
                onChange={(e) => {
                  tilbakestillFelt();
                  settFødt(e);
                }}
            />
          <RadioPanel
                key={"nei"}
                name={"radio-født"}
                label="Nei"
                value={"nei"}
                checked={født === "nei"}
                onChange={(e) => {
                  tilbakestillFelt();
                  settFødt(e);
                }}
            />
            </div>
            </KomponentGruppe>
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
          <Hovedknapp className="legg-til-barn__knapp" onClick={leggTilBarn}>Legg til barn</Hovedknapp>
          </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
