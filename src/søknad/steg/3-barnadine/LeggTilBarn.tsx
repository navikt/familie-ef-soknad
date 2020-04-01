import React, { useState, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../../context/SøknadContext';
import { differenceInYears } from 'date-fns';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import {
  formatDate,
  formatDateFnr,
  dagensDato,
  parseDate,
} from '../../../utils/dato';
import { barnetFødt } from './BarneConfig';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentUid } from '../../../utils/uuid';
import { standardLabelsBarn } from '../../../helpers/labels';
import { settLabelOgVerdi } from '../../../utils/søknad';

interface Props {
  settÅpenModal: Function;
  id?: string;
}

const LeggTilBarn: React.FC<Props> = ({ settÅpenModal, id }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(dagensDato);
  const [født, settBarnFødt] = useState();
  const [navn, settNavn] = useState('');
  const [personnummer, settPersonnummer] = useState('');
  const [boHosDeg, settBoHosDeg] = useState('');

  useEffect(() => {
    if (id) {
      const detteBarnet = søknad.person.barn.find((b) => b.id === id);

      settNavn(detteBarnet?.navn?.verdi ? detteBarnet.navn.verdi : '');
      settPersonnummer(
        detteBarnet?.personnummer?.verdi ? detteBarnet.personnummer.verdi : ''
      );
      settBarnFødt(detteBarnet?.født?.verdi);
      settBoHosDeg(detteBarnet?.harSammeAdresse?.verdi ? 'ja' : 'nei');
      settDato(
        detteBarnet?.fødselsdato
          ? parseDate(detteBarnet.fødselsdato?.verdi)
          : dagensDato
      );
    }
    // eslint-disable-next-line
  }, []);

  const settDato = (date: Date | null): void => {
    date !== null && settBarnDato(date);
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
      født: født,
      lagtTil: true,
      id: hentUid(),
    };

    const nyttBarn = settLabelOgVerdi(barn, standardLabelsBarn);

    const nyBarneListe = [
      ...søknad.person.barn.filter((b) => b.id !== id),
      nyttBarn,
    ];

    settSøknad({ ...søknad, person: { ...søknad.person, barn: nyBarneListe } });

    settÅpenModal(false);
  };

  return (
    <Seksjonsgruppe className="legg-til-barn">
      <Undertittel>Legg til barn</Undertittel>

      <KomponentGruppe>
        <div className="radiogruppe-2-svar">
          <JaNeiSpørsmål
            spørsmål={barnetFødt}
            onChange={(_, svar) => {
              tilbakestillFelt();
              settBarnFødt(svar);
            }}
            valgtSvar={født}
          />
        </div>
      </KomponentGruppe>
      {født === true ? (
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
      ) : født === false ? (
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
