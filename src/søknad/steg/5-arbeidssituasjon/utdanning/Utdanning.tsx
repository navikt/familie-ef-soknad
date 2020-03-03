import React, { useEffect, useState } from 'react';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SøkerSkalJobbeDeltid from './SøkerSkalJobbeDeltid';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon/arbeidssituasjon';
import { ISpørsmål } from '../../../../models/spørsmal';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { erValgtSvarLiktSomSvar, hentTekst } from '../../../../utils/søknad';
import {
  heltidEllerDeltidSpm,
  privatEllerOffentligSpm,
  utdanningDuKanFåStønadTil,
} from './UtdanningConfig';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/arbeidssituasjon/utdanning';
import { nyttTekstFelt, tomPeriode } from '../../../../utils/søknadsfelter';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const Utdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const { underUtdanning } = arbeidssituasjon;
  const [utdanning, settUtdanning] = useState<IUnderUtdanning>({
    skoleUtdanningssted: nyttTekstFelt,
    linjeKursGrad: nyttTekstFelt,
    periode: tomPeriode,
  });

  useEffect(() => {
    settUtdanning({
      skoleUtdanningssted: nyttTekstFelt,
      linjeKursGrad: nyttTekstFelt,
      periode: tomPeriode,
    });
  }, []);

  useEffect(() => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      underUtdanning: utdanning,
    });
    // eslint-disable-next-line
  }, [utdanning]);

  const oppdaterUtdanning = (
    nøkkel: EUtdanning,
    label: string,
    verdi: string
  ) => {
    underUtdanning &&
      settUtdanning({
        ...underUtdanning,
        [nøkkel]: { label: label, verdi: verdi },
      });
  };

  const settMultiSpørsmål = (spørsmål: ISpørsmål, svar: string) => {
    const søkerVilStudereHeltid = spørsmål.svaralternativer.find(
      (svarsalternativ) =>
        hentTekst(svarsalternativ.svar_tekstid, intl) === svar
    );
    if (
      (spørsmål.søknadid === EUtdanning.heltidEllerDeltid &&
        søkerVilStudereHeltid &&
        utdanning.målMedUtdanning) ||
      utdanning.arbeidsmengde
    ) {
      delete utdanning.arbeidsmengde;
      delete utdanning.målMedUtdanning;
    }
    settUtdanning({
      ...utdanning,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  const søkerSkalJobbeDeltid = erValgtSvarLiktSomSvar(
    utdanning.heltidEllerDeltid?.verdi,
    'utdanning.svar.deltid',
    intl
  );
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel'} />
        </Undertittel>
        <Hjelpetekst
          className={'sentrert'}
          åpneTekstid={utdanningDuKanFåStønadTil.åpneTekstid}
          innholdTekstid={utdanningDuKanFåStønadTil.innholdTekstid}
        />
      </KomponentGruppe>
      <SkoleOgLinje
        utdanning={utdanning}
        oppdaterUtdanning={oppdaterUtdanning}
      />

      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={privatEllerOffentligSpm}
          settSpørsmålOgSvar={settMultiSpørsmål}
          valgtSvar={utdanning.offentligEllerPrivat?.verdi}
          toKorteSvar={true}
        />
      </KomponentGruppe>

      <NårSkalDuVæreElevEllerStudent
        utdanning={utdanning}
        settUtdanning={settUtdanning}
      />

      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={heltidEllerDeltidSpm}
          settSpørsmålOgSvar={settMultiSpørsmål}
          valgtSvar={utdanning.heltidEllerDeltid?.verdi}
          toKorteSvar={true}
        />
      </KomponentGruppe>
      {søkerSkalJobbeDeltid && (
        <SøkerSkalJobbeDeltid
          utdanning={utdanning}
          oppdaterUtdanning={oppdaterUtdanning}
        />
      )}
    </SeksjonGruppe>
  );
};

export default Utdanning;
