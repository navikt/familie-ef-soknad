import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import useSøknadContext from '../../../context/SøknadContext';
import { differenceInYears } from 'date-fns';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { formatDate, formatDateFnr, dagensDato } from '../../../utils/dato';
import { barnetFødt } from './BarneConfig';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentUid } from '../../../utils/uuid';
import { standardLabelsBarn } from '../../../utils/standardLabels';

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

    const nyttBarn: any = {};

    Object.keys(barn).forEach((key: string) => {
      const barnLabel = standardLabelsBarn(key);

      if (barnLabel) {
        nyttBarn[key] = {
          label: barnLabel,
          verdi: (barn as any)[key],
        };
      } else {
        nyttBarn[key] = (barn as any)[key];
      }
    });

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
              console.log(svar);
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
