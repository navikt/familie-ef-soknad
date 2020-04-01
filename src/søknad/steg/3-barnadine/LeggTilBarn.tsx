import React, { useState, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../../context/SøknadContext';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { formatDateFnr, dagensDato, parseDate } from '../../../utils/dato';
import { barnetFødt } from './BarneConfig';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { ESvar } from '../../../models/spørsmalogsvar';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/barn';
import { hentNyttBarn } from '../../../helpers/barn';

interface Props {
  settÅpenModal: Function;
  id?: string;
}

const LeggTilBarn: React.FC<Props> = ({ settÅpenModal, id }) => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [barnDato, settBarnDato] = useState<Date>(dagensDato);
  const [født, settBarnFødt] = useState<boolean>();
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

    if (født) {
      const nyttBarn: IBarn = hentNyttBarn(
        fødselsnummer,
        personnummer,
        barnDato,
        navn,
        boHosDeg,
        født,
        intl
      );

      const nyBarneListe = [
        ...søknad.person.barn.filter((b) => b.id !== id),
        nyttBarn,
      ];

      settSøknad({
        ...søknad,
        person: { ...søknad.person, barn: nyBarneListe },
      });

      settÅpenModal(false);
    }
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
              settBarnFødt(svar.id === ESvar.JA);
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
