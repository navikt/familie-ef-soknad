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

import { IBarn } from '../../../models/steg/barn';
import { hentNyttBarn } from '../../../helpers/steg/barn';
import { ESvar, ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { oppdaterBarneliste } from '../../../utils/barn';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
  settÅpenModal: Function;
  id?: string;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneidid: string,
    barnepassid?: string
  ) => void;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const LeggTilBarn: React.FC<Props> = ({
  settÅpenModal,
  id,
  barneListe,
  settBarneListe,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useIntl();

  const [barnDato, settBarnDato] = useState<Date | undefined>();
  const [født, settBarnFødt] = useState<boolean>();
  const [navn, settNavn] = useState('');
  const [ident, settIdent] = useState<string>('');
  const [boHosDeg, settBoHosDeg] = useState<string>('');
  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(false);
  const [skalHaBarnepass, settSkalHaBarnepass] = useState<boolean | undefined>(
    true
  );
  const barnetFødtSpm = barnetFødt(intl);

  useEffect(() => {
    if (id) {
      const detteBarnet = barneListe.find((b) => b.id === id);

      settNavn(detteBarnet?.navn?.verdi ? detteBarnet.navn.verdi : '');
      settIdent(detteBarnet?.ident?.verdi ? detteBarnet.ident.verdi : '');
      settBarnFødt(detteBarnet?.født?.verdi);
      settBoHosDeg(detteBarnet?.harSammeAdresse?.verdi ? ESvar.JA : ESvar.NEI);
      settSkalHaBarnepass(detteBarnet?.skalHaBarnepass?.verdi);
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

  const leggTilEllerEndreBarn = (id: string | undefined) => {
    const nyttBarn: IBarn = hentNyttBarn(
      id,
      ident,
      barnDato,
      navn,
      boHosDeg,
      født ? født : false,
      intl,
      skalHaBarnepass
    );

    const nyBarneListe = oppdaterBarneliste(barneListe, nyttBarn);
    const erBarnFødtSvar = barnetFødtSpm.svaralternativer.find(
      (svar) => svar.id === (født ? ESvar.JA : ESvar.NEI)
    );
    erBarnFødtSvar &&
      settDokumentasjonsbehovForBarn(
        barnetFødtSpm,
        erBarnFødtSvar,
        nyttBarn.id
      );

    settBarneListe(nyBarneListe);

    settÅpenModal(false);
  };

  const settBarnFødtFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    tilbakestillFelt();
    settBarnFødt(svar.id === ESvar.JA);
  };

  return (
    <Seksjonsgruppe className="legg-til-barn" aria-live="polite">
      <Undertittel>
        {intl.formatMessage({ id: 'barnadine.leggtil' })}
      </Undertittel>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={barnetFødtSpm}
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
          aria-live="polite"
          className="legg-til-barn__knapp"
          onClick={() => leggTilEllerEndreBarn(id)}
        >
          <LocaleTekst tekst={'barnadine.leggtil'} />
        </Hovedknapp>
      )}
    </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
