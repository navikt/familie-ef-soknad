import React, { useState, useEffect } from 'react';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import { barnetFødt } from './BarneConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { formatDateFnr, dagensDato } from '../../../utils/dato';
import { parseISO } from 'date-fns';
import { IBarn } from '../../../models/barn';
import { hentNyttBarn } from '../../../helpers/steg/barn';
import { ESvar } from '../../../models/spørsmålogsvar';

interface Props {
  settÅpenModal: Function;
  id?: string;
}

const LeggTilBarn: React.FC<Props> = ({ settÅpenModal, id }) => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknad();
  const [barnDato, settBarnDato] = useState<Date | undefined>();
  const [født, settBarnFødt] = useState<boolean>();
  const [navn, settNavn] = useState('');
  const [ident, settIdent] = useState<string>('');
  const [boHosDeg, settBoHosDeg] = useState<string>('');
  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const detteBarnet = søknad.person.barn.find((b) => b.id === id);

      settNavn(detteBarnet?.navn?.verdi ? detteBarnet.navn.verdi : '');
      settIdent(detteBarnet?.ident?.verdi ? detteBarnet.ident.verdi : '');
      settBarnFødt(detteBarnet?.født?.verdi);
      settBoHosDeg(detteBarnet?.harSammeAdresse?.verdi ? ESvar.JA : ESvar.NEI);
      settDato(
        detteBarnet?.fødselsdato
          ? parseISO(detteBarnet.fødselsdato?.verdi)
          : dagensDato
      );
    }
    // eslint-disable-next-line
  }, []);

  const settDato = (date: Date | null): void => {
    date && settBarnDato(date);
  };

  const settBo = (event: any) => {
    settBoHosDeg(event.target.value);
  };

  const tilbakestillFelt = () => {
    settBarnDato(undefined);
    settNavn('');
    settIdent('');
    settBoHosDeg('');
  };

  const leggTilBarn = (id: string | undefined) => {
    const fødselsnummer =
      barnDato && ident ? formatDateFnr(barnDato) + ident : '';

    const nyttBarn: IBarn = hentNyttBarn(
      fødselsnummer,
      ident,
      barnDato,
      navn,
      boHosDeg,
      født ? født : false,
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
  };

  return (
    <Seksjonsgruppe className="legg-til-barn">
      <Undertittel>Legg til barn</Undertittel>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={barnetFødt}
          onChange={(_, svar) => {
            tilbakestillFelt();
            settBarnFødt(svar.id === ESvar.JA);
          }}
          valgtSvar={født}
        />
      </KomponentGruppe>
      {født === true ? (
        <LeggTilBarnFødt
          navn={navn}
          ident={ident}
          settNavn={settNavn}
          settIdent={settIdent}
          settBo={settBo}
          boHosDeg={boHosDeg}
          settBoHosDeg={settBoHosDeg}
          settDato={settDato}
          barnDato={barnDato}
          kjennerIkkeIdent={kjennerIkkeIdent}
          settKjennerIkkeIdent={settKjennerIkkeIdent}
        />
      ) : født === false ? (
        <LeggTilBarnUfødt
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
        />
      ) : null}
      {boHosDeg && (
        <Hovedknapp
          className="legg-til-barn__knapp"
          onClick={() => leggTilBarn(id)}
        >
          Legg til barn
        </Hovedknapp>
      )}
    </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
