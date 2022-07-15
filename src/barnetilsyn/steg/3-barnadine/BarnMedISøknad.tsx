import React, { FC } from 'react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentTekst } from '../../../utils/søknad';
import styled from 'styled-components/macro';
import { Checkbox } from '@navikt/ds-react';

const StyledCheckbox = styled.div`
  .skjemaelement {
    &__label {
      font-size: 18px !important;
      text-align: left;

      &:before {
        box-sizing: border-box;
      }
    }
    &.skalHaBarnepass {
      margin: 1rem 0;
    }
  }
`;

interface Props {
  skalHaBarnepass?: boolean;
  toggleSkalHaBarnepass: Function;
  id: string;
}

const BarnMedISøknad: FC<Props> = ({
  skalHaBarnepass,
  toggleSkalHaBarnepass,
  id,
}) => {
  const intl = useLokalIntlContext();

  return (
    <StyledCheckbox>
      <Checkbox
        className={'skalHaBarnepass'}
        checked={skalHaBarnepass}
        onChange={() => toggleSkalHaBarnepass(id)}
      >
        {hentTekst('barnadine.knapp.søkBarnetilsyn', intl)}
      </Checkbox>
    </StyledCheckbox>
  );
};

export default BarnMedISøknad;
