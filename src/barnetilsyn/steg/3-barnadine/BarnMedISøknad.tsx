import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';
import { hentTekst } from '../../../utils/søknad';
import styled from 'styled-components/macro';

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
      margin: 0 1rem 1rem 1rem;
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
  const intl = useIntl();

  return (
    <StyledCheckbox>
      <Checkbox
        label={hentTekst('barnadine.knapp.søkBarnetilsyn', intl)}
        className={'skalHaBarnepass'}
        checked={skalHaBarnepass}
        onChange={() => toggleSkalHaBarnepass(id)}
      />
    </StyledCheckbox>
  );
};

export default BarnMedISøknad;
