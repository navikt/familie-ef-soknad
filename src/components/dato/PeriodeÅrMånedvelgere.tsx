import React, { FC, useCallback, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { DatoBegrensning } from './Datovelger';
import Feilmelding from '../feil/Feilmelding';
import { strengTilDato } from '../../utils/dato';
import { EPeriode, IPeriode } from '../../models/felles/periode';
import { compareAsc, isEqual } from 'date-fns';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import Hjelpetekst from '../Hjelpetekst';
import styled from 'styled-components/macro';
import FeltGruppe from '../gruppe/FeltGruppe';
import ÅrMånedVelger from './ÅrMånedvelger';
import { gyldigPeriode } from './utils';

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
  datobegrensing?: DatoBegrensning;
  onValidate?: (isValid: boolean) => void;
  årMånedVelger?: boolean;
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
  årMånedVelger,
}) => {
  const [feilmelding, settFeilmelding] = useState('');

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

      if (fom && tom) {
        const erFraDatoSenereEnnTilDato = compareAsc(fom, tom) === 1;
        const erDatoerLike = isEqual(fom, tom);

        if (erFraDatoSenereEnnTilDato) {
          settFeilmelding('datovelger.periode.feilFormat');
          onValidate && onValidate(false);
        } else if (erDatoerLike) {
          settFeilmelding('datovelger.periode.likeDatoer');
          onValidate && onValidate(false);
        } else {
          settFeilmelding('');
          onValidate && onValidate(true);
        }
      } else {
        settFeilmelding('');
        onValidate && onValidate(true);
      }
    },
    [periode, onValidate]
  );

  const settPeriode = (dato: Date | null, objektnøkkel: EPeriode) => {
    dato !== null && settDato(dato, objektnøkkel);
    dato !== null && sammenlignDatoerOgOppdaterFeilmelding(dato, objektnøkkel);
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
            datobegrensning={
              datobegrensing ? datobegrensing : DatoBegrensning.TidligereDatoer
            }
          />

          <ÅrMånedVelger
            settDato={(e) => settPeriode(e, EPeriode.til)}
            valgtDato={
              periode.til.verdi && periode.til.verdi !== ''
                ? strengTilDato(periode.til.verdi)
                : undefined
            }
            tekstid={tomTekstid ? tomTekstid : 'periode.til'}
            datobegrensning={
              datobegrensing ? datobegrensing : DatoBegrensning.TidligereDatoer
            }
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
