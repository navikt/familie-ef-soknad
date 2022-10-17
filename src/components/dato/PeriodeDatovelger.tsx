import { FC, useEffect, useState } from 'react';
import Datovelger, { DatoBegrensning } from './Datovelger';
import Feilmelding from '../feil/Feilmelding';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import LesMerTekst from '../LesMerTekst';
import styled from 'styled-components/macro';
import FeltGruppe from '../gruppe/FeltGruppe';
import KomponentGruppe from '../gruppe/KomponentGruppe';
import {
  erDatoerLike,
  erDatoInnaforBegrensinger,
  erFraDatoSenereEnnTilDato,
  hentStartOgSluttDato,
} from './utils';
import { erGyldigDato } from '../../utils/dato';
import { Label } from '@navikt/ds-react';

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
      return 'datovelger.periode.ugyldigDato';
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
      return 'datovelger.periode.likeDatoer';
    else if (
      startDato &&
      sluttDato &&
      !erFraDatoSenereEnnTilDato(startDato, sluttDato)
    )
      return 'datovelger.periode.startFørSlutt';
    else return '';
  };

  useEffect(() => {
    const harStartEllerSluttDato =
      periode.fra.verdi !== '' || periode.til.verdi !== '';

    harStartEllerSluttDato &&
      settFeilmelding(
        sammenlignDatoerOgHentFeilmelding(periode, datobegrensning)
      );

    if (onValidate && feilmelding !== '') onValidate(true);
    if (onValidate && feilmelding === '') onValidate(false);
  }, [feilmelding, onValidate, periode, datobegrensning]);

  const settPeriode = (dato: string, objektnøkkel: EPeriode) => {
    dato !== '' && settDato(dato, objektnøkkel);
  };

  return (
    <KomponentGruppe className={className}>
      <FeltGruppe>
        <Label>{tekst}</Label>
        {hjelpetekst && (
          <LesMerTekst
            åpneTekstid={hjelpetekst.åpneTekstid}
            innholdTekstid={hjelpetekst.innholdTekstid}
          />
        )}
      </FeltGruppe>
      <PeriodeGruppe className="periodegruppe" aria-live="polite">
        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.fra)}
          valgtDato={periode.fra.verdi}
          tekstid={fomTekstid ? fomTekstid : 'periode.fra'}
          datobegrensning={datobegrensning}
          gjemFeilmelding={true}
        />

        <Datovelger
          settDato={(e) => settPeriode(e, EPeriode.til)}
          valgtDato={periode.til.verdi}
          tekstid={tomTekstid ? tomTekstid : 'periode.til'}
          datobegrensning={datobegrensning}
          gjemFeilmelding={true}
        />
        {feilmelding && feilmelding !== '' && (
          <Feilmelding className={'feilmelding'} tekstid={feilmelding} />
        )}
      </PeriodeGruppe>
    </KomponentGruppe>
  );
};

export default PeriodeDatovelgere;
