import React, { useState } from 'react';

import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';
import styled from 'styled-components/macro';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}

const StyledAndreForelderGruppe = styled.div`
  display: grid;
  min-width: 500px;
  grid-template-columns: repeat(3, min-content);
  grid-template-rows: repeat(3, min-content);
  grid-gap: 1rem;
  grid-template-areas: 'navn navn' 'fødselsdato personnr' 'checkbox checkbox';

  .foreldre-navn-input {
    grid-area: navn;
  }

  .datovelger {
    grid-area: fødselsdato;
  }
  .personnummer {
    grid-area: personnr;
    min-width: 300px;
    .skjemaelement__label {
      margin-bottom: 1rem;
    }
  }
  .checkbox {
    grid-area: checkbox;
  }
`;
const OmAndreForelder: React.FC<Props> = ({ settForelder, forelder }) => {
  const [huketAv, settHuketAv] = useState<boolean>(false);

  const hukAv = (e: any) => {
    settHuketAv(e.target.checked);

    const nyForelder = { ...forelder };

    if (e.target.checked) {
      delete nyForelder.navn;
      delete nyForelder.fødselsdato;
      delete nyForelder.personnr;
    }

    settForelder(nyForelder);
  };

  return (
    <KomponentGruppe>
      <StyledAndreForelderGruppe>
        <Input
          className="foreldre-navn-input"
          onChange={(e) =>
            settForelder({
              ...forelder,
              navn: {
                label: 'halla',
                verdi: e.target.value,
              },
            })
          }
          value={forelder.navn ? forelder.navn?.verdi : ''}
          label="Navn"
          disabled={huketAv}
        />

        {forelder.navn && (
          <>
            <Datovelger
              disabled={huketAv}
              settDato={(e: Date | null) => {
                e !== null &&
                  settForelder({
                    ...forelder,
                    flyttetFra: {
                      label: 'Fødselsnummer datotest',
                      verdi: e,
                    },
                  });
              }}
              valgtDato={
                forelder.fødselsdato && forelder.fødselsdato.verdi
                  ? forelder.fødselsdato.verdi
                  : undefined
              }
              tekstid={'datovelger.fødselsdato'}
              datobegrensning={DatoBegrensning.TidligereDatoer}
            />
            <Input
              className="personnummer"
              onChange={(e) =>
                settForelder({
                  ...forelder,
                  personnr: {
                    label: 'Personnr',
                    verdi: e.target.value,
                  },
                })
              }
              value={forelder.personnr ? forelder.personnr?.verdi : ''}
              label="Personnummer (hvis barnet har fått)"
              disabled={huketAv}
            />
          </>
        )}

        <Checkbox
          className={'checkbox'}
          label={'Jeg kan ikke oppgi den andre forelderen'}
          checked={huketAv}
          onChange={hukAv}
        />
      </StyledAndreForelderGruppe>
    </KomponentGruppe>
  );
};

export default OmAndreForelder;
