import React, { useEffect, useState } from 'react';
import {
  EStudieandel,
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import ErUtdanningenOffentligEllerPrivat from './ErUtdanningenOffentligEllerPrivat';
import ErUtdanningenPåHeltidEllerDeltid from './ErUtdanningenPåHeltidEllerDeltid';
import LesMerTekst from '../../../../components/LesMerTekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';
import StudieArbeidsmengde from './StudieArbeidsmengde';
import TidligereUtdanning from './TidligereUtdanning';
import {
  utdanningDuKanFåStønadTil,
  utdanningDuKanFåStønadTilSkolepenger,
} from './UtdanningConfig';
import MålMedUtdanningen from './MålMedUtdanningen';
import {
  erDetaljertUtdanningFerdigUtfylt,
  erUnderUtdanningFerdigUtfylt,
} from '../../../../helpers/steg/aktivitetvalidering';
import { strengErMerEnnNull } from '../../../../utils/spørsmålogsvar';
import { lagTomUnderUtdanning } from '../../../../helpers/steg/utdanning';
import { IDetaljertUtdanning } from '../../../../skolepenger/models/detaljertUtdanning';
import Studiekostnader from './Studiekostnader';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';
import styled from 'styled-components/macro';
import { erPeriodeGyldigOgInnaforBegrensninger } from '../../../../components/dato/utils';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';
import { Heading } from '@navikt/ds-react';

const LesMerTekstUnderSidetittel = styled(LesMerTekst)`
  margin-top: -2rem;
`;

interface Props {
  underUtdanning?: IUnderUtdanning | IDetaljertUtdanning;
  oppdaterUnderUtdanning: (
    utdanning: IUnderUtdanning | IDetaljertUtdanning
  ) => void;
  stønadstype: Stønadstype;
}

const UnderUtdanning: React.FC<Props> = ({
  underUtdanning,
  oppdaterUnderUtdanning,
  stønadstype,
}) => {
  const skalHaDetaljertUtdanning = stønadstype === Stønadstype.skolepenger;
  const [utdanning, settUtdanning] = useState<
    IUnderUtdanning | IDetaljertUtdanning
  >(underUtdanning ? underUtdanning : lagTomUnderUtdanning());

  useEffect(() => {
    oppdaterUnderUtdanning(utdanning);
    // eslint-disable-next-line
  }, [utdanning]);

  useEffect(() => {
    if (
      utdanning.periode &&
      !erPeriodeGyldigOgInnaforBegrensninger(
        utdanning?.periode,
        DatoBegrensning.AlleDatoer
      )
    ) {
      delete utdanning.heltidEllerDeltid;
    }
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
          {stønadstype === Stønadstype.overgangsstønad && (
            <>
              <Heading size="small" level="3" className={'sentrert'}>
                <LocaleTekst tekst={'utdanning.tittel'} />
              </Heading>
              <LesMerTekst
                åpneTekstid={utdanningDuKanFåStønadTil.åpneTekstid}
                innholdTekstid={utdanningDuKanFåStønadTil.innholdTekstid}
              />
            </>
          )}
          {stønadstype === Stønadstype.skolepenger && (
            <LesMerTekstUnderSidetittel
              åpneTekstid={utdanningDuKanFåStønadTilSkolepenger.åpneTekstid}
              innholdTekstid={
                utdanningDuKanFåStønadTilSkolepenger.innholdTekstid
              }
            />
          )}
        </KomponentGruppe>

        <SkoleOgLinje
          aria-live="polite"
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
        {utdanning?.periode &&
          erPeriodeGyldigOgInnaforBegrensninger(
            utdanning?.periode,
            DatoBegrensning.AlleDatoer
          ) && (
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
