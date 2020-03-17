import React, { useState, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../../context/SøknadContext';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';
import {
  formatDate,
  formatDateFnr,
  dagensDato,
  parseDate,
} from '../../../utils/dato';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentUid } from '../../../utils/uuid';

interface Props {
  settÅpenModal: Function;
  id?: string;
}

const LeggTilBarn: React.FC<Props> = ({ settÅpenModal, id }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(dagensDato);
  const [født, settBarnFødt] = useState('');
  const [navn, settNavn] = useState('');
  const [personnummer, settPersonnummer] = useState('');
  const [boHosDeg, settBoHosDeg] = useState('');

  useEffect(() => {
    if (id) {
      const detteBarnet = søknad.person.barn.find((b) => b.id === id);

      settNavn(detteBarnet?.navn ? detteBarnet.navn : '');
      settPersonnummer(
        detteBarnet?.personnummer ? detteBarnet.personnummer : ''
      );
      settBarnFødt(detteBarnet?.ufødt ? 'nei' : 'ja');
      settBoHosDeg(detteBarnet?.harSammeAdresse ? 'ja' : 'nei');
      settDato(
        detteBarnet?.fødselsdato
          ? parseDate(detteBarnet.fødselsdato)
          : dagensDato
      );
    }
    // eslint-disable-next-line
  }, []);

  const settDato = (date: Date | null): void => {
    date !== null && settBarnDato(date);
  };

  const settFødt = (event: any) => {
    settBarnFødt(event.target.value);
  };

  const settBo = (event: any) => {
    settBoHosDeg(event.target.value);
  };

  const tilbakestillFelt = () => {
    settBarnDato(dagensDato);
    settNavn('');
    settPersonnummer('');
    settBoHosDeg('');
  };

  const leggTilBarn = (id: string | undefined) => {
    const fødselsnummer =
      barnDato && personnummer ? formatDateFnr(barnDato) + personnummer : '';

    const barn = {
      fnr: fødselsnummer,
      personnummer: personnummer,
      alder: differenceInYears(dagensDato, barnDato),
      navn: navn,
      fødselsdato: formatDate(barnDato),
      harSammeAdresse: boHosDeg === 'ja',
      ufødt: født === 'nei',
      lagtTil: true,
      id: hentUid(),
    };

    const nyBarneListe = [
      ...søknad.person.barn.filter((b) => b.id !== id),
      barn,
    ];

    settSøknad({ ...søknad, person: { ...søknad.person, barn: nyBarneListe } });

    settÅpenModal(false);
  };

  return (
    <Seksjonsgruppe className="legg-til-barn">
      <Undertittel>Legg til barn</Undertittel>

      <KomponentGruppe>
        <Element>Er barnet født?</Element>

        <div className="radiogruppe-2-svar">
          <RadioPanel
            key={'ja'}
            name={'radio-født'}
            label="Ja"
            value={'ja'}
            checked={født === 'ja'}
            onChange={(e) => {
              tilbakestillFelt();
              settFødt(e);
            }}
          />
          <RadioPanel
            key={'nei'}
            name={'radio-født'}
            label="Nei"
            value={'nei'}
            checked={født === 'nei'}
            onChange={(e) => {
              tilbakestillFelt();
              settFødt(e);
            }}
          />
        </div>
      </KomponentGruppe>
      {født === 'ja' ? (
        <LeggTilBarnFødt
          navn={navn}
          personnummer={personnummer}
          settNavn={settNavn}
          settPersonnummer={settPersonnummer}
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
        />
      ) : født === 'nei' ? (
        <LeggTilBarnUfødt
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
        />
      ) : null}
      <Hovedknapp
        className="legg-til-barn__knapp"
        onClick={() => leggTilBarn(id)}
      >
        Legg til barn
      </Hovedknapp>
    </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
