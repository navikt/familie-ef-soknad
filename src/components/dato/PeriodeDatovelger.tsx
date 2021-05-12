import React, { FC, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import Feilmelding from '../feil/Feilmelding';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import Hjelpetekst from '../Hjelpetekst';
import styled from 'styled-components/macro';
import FeltGruppe from '../gruppe/FeltGruppe';
import KomponentGruppe from '../gruppe/KomponentGruppe';
import {
  erDatoerLike,
  erFraDatoSenereEnnTilDato,
  gyldigPeriode,
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
  className?: string;
  tekst: string;
  hjelpetekst?: IHjelpetekst;
  periode: IPeriode;
  fomTekstid?: string;
  tomTekstid?: string;
  settDato: (dato: string, objektnøkkel: EPeriode) => void;
  datobegrensning: DatoBegrensning;
  onValidate?: (isValid: boolean) => void;
}

const PeriodeDatovelgere: FC<Props> = ({
  className,
  periode,
  hjelpetekst,
  settDato,
  tekst,
  fomTekstid,
  tomTekstid,
  datobegrensning,
  onValidate,
}) => {
  const [feilmelding, settFeilmelding] = useState<string>('');
  const periodeDatobegrensning: DatoBegrensning = datobegrensning
    ? datobegrensning
    : DatoBegrensning.TidligereDatoer;

  const sammenlignDatoerOgHentFeilmelding = (
    periode: IPeriode,
    datobegrensning: DatoBegrensning
  ): string => {
    const { startDato, sluttDato } = hentStartOgSluttDato(periode);

    if (startDato && sluttDato) {
      if (!erFraDatoSenereEnnTilDato(startDato, sluttDato))
        return 'datovelger.periode.startFørSlutt';
      else if (erDatoerLike(startDato, sluttDato))
        return 'datovelger.periode.likeDatoer';
      else if (!gyldigPeriode(periode, datobegrensning))
        return 'datovelger.periode.ugyldigDato';
      else return '';
    } else return '';
  };

  useEffect(() => {
    const oppdatertFeilmelding = sammenlignDatoerOgHentFeilmelding(
      periode,
      datobegrensning
    );
    settFeilmelding(oppdatertFeilmelding);

    if (onValidate && feilmelding !== '') onValidate(true);
    if (onValidate && feilmelding === '') onValidate(false);
  }, [feilmelding, onValidate, periode, datobegrensning]);

  const settPeriode = (dato: string, objektnøkkel: EPeriode) => {
    settDato(dato, objektnøkkel);
  };

  return (
    <KomponentGruppe className={className}>
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
      <PeriodeGruppe className="periodegruppe" aria-live="polite">
        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.fra)}
          valgtDato={periode.fra.verdi}
          tekstid={fomTekstid ? fomTekstid : 'periode.fra'}
          datobegrensning={periodeDatobegrensning}
        />

        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.til)}
          valgtDato={periode.til.verdi}
          tekstid={tomTekstid ? tomTekstid : 'periode.til'}
          datobegrensning={periodeDatobegrensning}
        />
        {feilmelding && feilmelding !== '' && (
          <Feilmelding className={'feilmelding'} tekstid={feilmelding} />
        )}
      </PeriodeGruppe>
    </KomponentGruppe>
  );
};

export default PeriodeDatovelgere;
