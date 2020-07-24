import React, { useEffect, useState } from 'react';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LeggTilBarnFødt from './LeggTilBarnFødt';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import { barnetFødt } from './BarneConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { strengTilDato } from '../../../utils/dato';

import { IBarn } from '../../../models/barn';
import { hentNyttBarn } from '../../../helpers/steg/barn';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';

interface Props {
  settÅpenModal: Function;
  id?: string;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const LeggTilBarn: React.FC<Props> = ({
  settÅpenModal,
  id,
  barneListe,
  settBarneListe,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();

  const [barnDato, settBarnDato] = useState<Date | undefined>();
  const [født, settBarnFødt] = useState<boolean>();
  const [navn, settNavn] = useState('');
  const [ident, settIdent] = useState<string>('');
  const [boHosDeg, settBoHosDeg] = useState<string>('');
  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(false);
  const [medISøknad, settMedISøknad] = useState<boolean>();

  useEffect(() => {
    if (id) {
      const detteBarnet = barneListe.find((b) => b.id === id);

      settNavn(detteBarnet?.navn?.verdi ? detteBarnet.navn.verdi : '');
      settIdent(detteBarnet?.ident?.verdi ? detteBarnet.ident.verdi : '');
      settBarnFødt(detteBarnet?.født?.verdi);
      settBoHosDeg(detteBarnet?.harSammeAdresse?.verdi ? ESvar.JA : ESvar.NEI);
      settMedISøknad(detteBarnet?.medISøknad?.verdi);
      detteBarnet?.fødselsdato.verdi &&
        settDato(strengTilDato(detteBarnet.fødselsdato?.verdi));
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

  const oppdaterBarneliste = (
    barneListe: IBarn[],
    id: string | undefined,
    nyttBarn: IBarn
  ) => {
    const erEndringAvBarn = id !== undefined;
    if (erEndringAvBarn) {
      return barneListe.map((barn) => {
        return barn.id === id ? nyttBarn : barn;
      });
    } else {
      return [...barneListe.filter((b) => b.id !== id), nyttBarn];
    }
  };

  const leggTilEllerEndreBarn = (id: string | undefined) => {
    const nyttBarn: IBarn = hentNyttBarn(
      id,
      ident,
      barnDato,
      navn,
      boHosDeg,
      født ? født : false,
      intl,
      medISøknad
    );

    const nyBarneListe = oppdaterBarneliste(barneListe, id, nyttBarn);
    const erBarnFødtSvar = barnetFødt.svaralternativer.find(
      (svar) => svar.id === (født ? ESvar.JA : ESvar.NEI)
    );
    erBarnFødtSvar && settDokumentasjonsbehov(barnetFødt, erBarnFødtSvar);

    settBarneListe(nyBarneListe);

    settÅpenModal(false);
  };

  const settBarnFødtFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    tilbakestillFelt();
    settBarnFødt(svar.id === ESvar.JA);
  };

  return (
    <Seksjonsgruppe className="legg-til-barn">
      <Undertittel>Legg til barn</Undertittel>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={barnetFødt}
          onChange={settBarnFødtFelt}
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
          onClick={() => leggTilEllerEndreBarn(id)}
        >
          Legg til barn
        </Hovedknapp>
      )}
    </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
