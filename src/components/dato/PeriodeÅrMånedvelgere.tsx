import React, { FC, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { DatoBegrensning } from './Datovelger';
import Feilmelding from '../feil/Feilmelding';
import { erGyldigDato, strengTilDato } from '../../utils/dato';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import Hjelpetekst from '../Hjelpetekst';
import styled from 'styled-components/macro';
import FeltGruppe from '../gruppe/FeltGruppe';
import ÅrMånedVelger from './ÅrMånedvelger';
import {
  erDatoerLike,
  erDatoInnaforBegrensinger,
  erFraDatoSenereEnnTilDato,
  hentStartOgSluttDato,
} from './utils';

const PeriodeGruppe = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  grid-template-rows: repeat(2, min-content);
  grid-gap: 2rem;

  .feilmelding {
    grid-column: 1/3;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2rem;

    .feilmelding {
      grid-column: 1/2;
    }
  }
`;

interface Props {
  tekst: string;
  hjelpetekst?: IHjelpetekst;
  periode: IPeriode;
  fomTekstid?: string;
  tomTekstid?: string;
  settDato: (dato: Date | null, objektnøkkel: EPeriode) => void;
  datobegrensing: DatoBegrensning;
  onValidate?: (isValid: boolean) => void;
}

const PeriodeÅrMånedvelgere: FC<Props> = ({
  periode,
  hjelpetekst,
  settDato,
  tekst,
  fomTekstid,
  tomTekstid,
  datobegrensing,
  onValidate,
}) => {
  const [feilmelding, settFeilmelding] = useState('');

  const sammenlignDatoerOgHentFeilmelding = (
    periode: IPeriode,
    datobegrensning: DatoBegrensning
  ): string => {
    const { startDato, sluttDato } = hentStartOgSluttDato(periode);
    const { fra, til } = periode;

    const erStartDatoUtenforBegrensninger: boolean =
      fra.verdi !== '' &&
      !erDatoInnaforBegrensinger(fra.verdi, datobegrensning);
    const erSluttUtenforBegrensninger: boolean =
      til.verdi !== '' &&
      !erDatoInnaforBegrensinger(til.verdi, datobegrensning);

    if (
      (fra.verdi !== '' && !erGyldigDato(fra.verdi)) ||
      (til.verdi !== '' && !erGyldigDato(til.verdi))
    )
      return 'datovelger.periode.feilFormatMndÅr';
    else if (
      (erStartDatoUtenforBegrensninger || erSluttUtenforBegrensninger) &&
      datobegrensning === DatoBegrensning.TidligereDatoer
    )
      return 'datovelger.ugyldigDato.kunTidligereDatoer';
    else if (
      (erStartDatoUtenforBegrensninger || erSluttUtenforBegrensninger) &&
      datobegrensning === DatoBegrensning.FremtidigeDatoer
    )
      return 'datovelger.ugyldigDato.kunFremtidigeDatoer';
    else if (startDato && sluttDato && erDatoerLike(startDato, sluttDato))
      return 'datovelger.periode.likMndÅr';
    else if (
      startDato &&
      sluttDato &&
      !erFraDatoSenereEnnTilDato(startDato, sluttDato)
    )
      return 'datovelger.periode.startMndÅrFørSluttMndÅr';
    else return '';
  };

  useEffect(() => {
    const harStartEllerSluttDato =
      periode.fra.verdi !== '' || periode.til.verdi !== '';

    harStartEllerSluttDato &&
      settFeilmelding(
        sammenlignDatoerOgHentFeilmelding(periode, datobegrensing)
      );
    if (onValidate && feilmelding !== '') onValidate(true);
    if (onValidate && feilmelding === '') onValidate(false);
  }, [feilmelding, periode, datobegrensing, onValidate]);

  const settPeriode = (dato: Date | null, objektnøkkel: EPeriode) => {
    settDato(dato, objektnøkkel);
  };

  return (
    <>
      <FeltGruppe>
        <Element>{tekst}</Element>
        {hjelpetekst && (
          <Hjelpetekst
            åpneTekstid={hjelpetekst.åpneTekstid}
            innholdTekstid={hjelpetekst.innholdTekstid}
            lukkeTekstid={hjelpetekst.lukkeTekstid}
          />
        )}
      </FeltGruppe>
      <PeriodeGruppe aria-live="polite">
        <>
          <ÅrMånedVelger
            settDato={(e) => settPeriode(e, EPeriode.fra)}
            valgtDato={
              periode.fra.verdi && periode.fra.verdi !== ''
                ? strengTilDato(periode.fra.verdi)
                : undefined
            }
            tekstid={fomTekstid ? fomTekstid : 'periode.fra'}
            datobegrensning={datobegrensing}
          />

          <ÅrMånedVelger
            settDato={(e) => settPeriode(e, EPeriode.til)}
            valgtDato={
              periode.til.verdi && periode.til.verdi !== ''
                ? strengTilDato(periode.til.verdi)
                : undefined
            }
            tekstid={tomTekstid ? tomTekstid : 'periode.til'}
            datobegrensning={datobegrensing}
          />
        </>
        {feilmelding && feilmelding !== '' && (
          <Feilmelding className={'feilmelding'} tekstid={feilmelding} />
        )}
      </PeriodeGruppe>
    </>
  );
};

export default PeriodeÅrMånedvelgere;
