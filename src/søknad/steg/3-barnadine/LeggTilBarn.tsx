import React, { useEffect, useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LeggTilBarnUfødt from './LeggTilBarnUfødt';
import Seksjonsgruppe from '../../../components/gruppe/SeksjonGruppe';
import { barnetFødt } from './BarneConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';

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

  const [barnDato, settBarnDato] = useState<string>('');
  const [født, settBarnFødt] = useState<boolean>();
  const [navn, settNavn] = useState('');
  const [ident, settIdent] = useState<string>('');
  const [boHosDeg, settBoHosDeg] = useState<string>('');
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
        settDato(detteBarnet.fødselsdato?.verdi);
    }
    // eslint-disable-next-line
  }, []);

  const settDato = (date: string): void => {
    date && settBarnDato(date);
  };

  const settBo = (event: any) => {
    settBoHosDeg(event.target.value);
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

  return (
    <Seksjonsgruppe className="legg-til-barn" aria-live="polite">
      <Undertittel>
        {intl.formatMessage({ id: 'barnadine.leggtil' })}
      </Undertittel>

      <KomponentGruppe>
        <LeggTilBarnUfødt
          settBo={settBo}
          boHosDeg={boHosDeg}
          settDato={settDato}
          barnDato={barnDato}
        />
      </KomponentGruppe>
      {boHosDeg && (
        <Hovedknapp
          aria-live="polite"
          onClick={() => leggTilEllerEndreBarn(id)}
        >
          <LocaleTekst tekst={'barnadine.leggtil'} />
        </Hovedknapp>
      )}
    </Seksjonsgruppe>
  );
};

export default LeggTilBarn;
