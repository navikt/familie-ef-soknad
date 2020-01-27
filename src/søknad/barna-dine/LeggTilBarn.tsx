import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import useSøknadContext from '../../context/SøknadContext';
import DatePicker from 'react-datepicker';
import { differenceInYears } from 'date-fns';

interface Props {
    navn: string;
    settÅpenModal: Function;
}

const LeggTilBarn: React.FC<Props> = ( { navn, settÅpenModal }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(new Date());

  const settDato = (date: Date | null): void => {
    date !== null && settBarnDato(date);
  };

  console.log(søknad);

  const barn = {
      fnr: "0123456789",
      alder: differenceInYears(new Date(), barnDato),
      navn: "Barn",
      fødselsdato: barnDato.toString(),
      harSammeAdresse: false,
      ufødt: true,
  }

  const leggTilBarn = () => {
    const nyBarneListe = [...søknad.person.barn, barn];

    settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});

    settÅpenModal(false);
  }

  return (
        <div className="legg-til-barn">
          <h2>Legg til barn</h2>
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
          <Knapp onClick={leggTilBarn}>Legg til</Knapp>
        </div>
  );
};

export default LeggTilBarn;
