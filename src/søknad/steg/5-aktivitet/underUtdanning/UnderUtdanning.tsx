import React, { useEffect, useState } from 'react';
import {
  EStudieandel,
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import ErUtdanningenOffentligEllerPrivat from './ErUtdanningenOffentligEllerPrivat';
import ErUtdanningenPåHeltidEllerDeltid from './ErUtdanningenPåHeltidEllerDeltid';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';
import StudieArbeidsmengde from './StudieArbeidsmengde';
import TidligereUtdanning from './TidligereUtdanning';
import { Undertittel } from 'nav-frontend-typografi';
import { utdanningDuKanFåStønadTil } from './UtdanningConfig';
import MålMedUtdanningen from './MålMedUtdanningen';
import {
  erDetaljertUtdanningFerdigUtfylt,
  erUnderUtdanningFerdigUtfylt,
} from '../../../../helpers/steg/aktivitetvalidering';
import { strengErMerEnnNull } from '../../../../utils/spørsmålogsvar';
import { lagTomUnderUtdanning } from '../../../../helpers/steg/utdanning';
import { IDetaljertUtdanning } from '../../../../skolepenger/models/detaljertUtdanning';
import Studiekostnader from './Studiekostnader';

interface Props {
  underUtdanning?: IUnderUtdanning | IDetaljertUtdanning;
  oppdaterUnderUtdanning: (
    utdanning: IUnderUtdanning | IDetaljertUtdanning
  ) => void;
  skalHaDetaljertUtdanning?: boolean;
}

const UnderUtdanning: React.FC<Props> = ({
  underUtdanning,
  oppdaterUnderUtdanning,
  skalHaDetaljertUtdanning = false,
}) => {
  const [utdanning, settUtdanning] = useState<
    IUnderUtdanning | IDetaljertUtdanning
  >(underUtdanning ? underUtdanning : lagTomUnderUtdanning());

  useEffect(() => {
    oppdaterUnderUtdanning(utdanning);
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

  const søkerSkalJobbeDeltid =
    utdanning.heltidEllerDeltid?.svarid === EStudieandel.deltid;
  const søkerSkalJobbeHeltid =
    utdanning.heltidEllerDeltid?.svarid === EStudieandel.heltid;

  const visTidligereUtdanning = skalHaDetaljertUtdanning
    ? erDetaljertUtdanningFerdigUtfylt(utdanning)
    : erUnderUtdanningFerdigUtfylt(utdanning);
  return (
    <>
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

        {utdanning.linjeKursGrad?.verdi && (
          <ErUtdanningenOffentligEllerPrivat
            utdanning={utdanning}
            settUtdanning={settUtdanning}
          />
        )}
        {utdanning.offentligEllerPrivat?.verdi && (
          <NårSkalDuVæreElevEllerStudent
            utdanning={utdanning}
            settUtdanning={settUtdanning}
          />
        )}
        {utdanning.periode?.til.verdi && utdanning.periode?.fra.verdi && (
          <ErUtdanningenPåHeltidEllerDeltid
            utdanning={utdanning}
            settUtdanning={settUtdanning}
          />
        )}
        {søkerSkalJobbeHeltid && (
          <MålMedUtdanningen
            utdanning={utdanning}
            oppdaterUtdanning={oppdaterUtdanning}
          />
        )}
        {søkerSkalJobbeDeltid && (
          <>
            <StudieArbeidsmengde
              utdanning={utdanning}
              oppdaterUtdanning={oppdaterUtdanning}
            />
            {strengErMerEnnNull(utdanning.arbeidsmengde?.verdi) && (
              <MålMedUtdanningen
                utdanning={utdanning}
                oppdaterUtdanning={oppdaterUtdanning}
              />
            )}
          </>
        )}
        {skalHaDetaljertUtdanning &&
          erUnderUtdanningFerdigUtfylt(utdanning) && (
            <Studiekostnader
              utdanning={utdanning}
              oppdaterUtdanning={oppdaterUtdanning}
            />
          )}
      </SeksjonGruppe>

      {visTidligereUtdanning && (
        <>
          <TidligereUtdanning
            underUtdanning={utdanning}
            settUnderUtdanning={settUtdanning}
          />
        </>
      )}
    </>
  );
};

export default UnderUtdanning;
