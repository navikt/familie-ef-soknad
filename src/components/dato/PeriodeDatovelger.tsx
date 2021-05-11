import React, { FC, useCallback, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Datovelger, { DatoBegrensning } from './Datovelger';
import Feilmelding from '../feil/Feilmelding';
import { strengTilDato } from '../../utils/dato';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { compareAsc, isEqual } from 'date-fns';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import Hjelpetekst from '../Hjelpetekst';
import styled from 'styled-components/macro';
import FeltGruppe from '../gruppe/FeltGruppe';
import KomponentGruppe from '../gruppe/KomponentGruppe';
import { gyldigPeriode, harStartEllerSluttdato } from './utils';

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

const hentFeilmeldingTekstidForPeriode = (
  periode: IPeriode,
  datobegrensning: DatoBegrensning
): string => {
  if (!gyldigPeriode(periode, datobegrensning)) return 'datovelger.ugyldigDato';
  else if (datobegrensning === DatoBegrensning.FremtidigeDatoer)
    return 'datovelger.periode.ugyldigDato.kunFremtidigeDatoer';
  else if (datobegrensning === DatoBegrensning.TidligereDatoer)
    return 'datovelger.periode.ugyldigDato.kunTidligereDatoer';
  else return '';
};

interface Props {
  className?: string;
  tekst: string;
  hjelpetekst?: IHjelpetekst;
  periode: IPeriode;
  fomTekstid?: string;
  tomTekstid?: string;
  settDato: (dato: string, objektnøkkel: EPeriode) => void;
  datobegrensing: DatoBegrensning;
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
  datobegrensing,
  onValidate,
}) => {
  const [feilmelding, settFeilmelding] = useState<string>('');
  const periodeDatobegrensning: DatoBegrensning = datobegrensing
    ? datobegrensing
    : DatoBegrensning.TidligereDatoer;

  const sammenlignDatoerOgOppdaterFeilmelding = useCallback(
    (dato: Date, periodenøkkel: EPeriode) => {
      const { fra, til } = periode;
      const fom: Date | undefined =
        periodenøkkel === EPeriode.fra
          ? dato
          : fra.verdi !== ''
          ? strengTilDato(fra.verdi)
          : undefined;

      const tom: Date | undefined =
        periodenøkkel === EPeriode.til
          ? dato
          : til.verdi !== ''
          ? strengTilDato(til.verdi)
          : undefined;

      const erFraDatoSenereEnnTilDato =
        fom && tom && compareAsc(fom, tom) === 1;
      const erDatoerLike = fom && tom && isEqual(fom, tom);

      if (fom && tom) {
        if (erFraDatoSenereEnnTilDato)
          settFeilmelding('datovelger.periode.startFørSlutt');
        else if (erDatoerLike) settFeilmelding('datovelger.periode.likeDatoer');
        else if (!gyldigPeriode(periode, datobegrensing))
          settFeilmelding('datovelger.periode.ugyldigDato');
        else settFeilmelding('');
      } else if (harStartEllerSluttdato(periode)) {
        if (!gyldigPeriode(periode, datobegrensing))
          settFeilmelding('datovelger.periode.ugyldigDato');
        else settFeilmelding('');
      } else settFeilmelding('');
    },
    [periode, periodeDatobegrensning]
  );

  useEffect(() => {
    if (onValidate && feilmelding !== '') onValidate(true);
    if (onValidate && feilmelding === '') onValidate(false);
  }, [feilmelding, onValidate]);

  const settPeriode = (dato: string, objektnøkkel: EPeriode) => {
    console.log('SettPeriode');
    settDato(dato, objektnøkkel);
    sammenlignDatoerOgOppdaterFeilmelding(strengTilDato(dato), objektnøkkel);
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
