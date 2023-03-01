import React, { FC } from 'react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentTekst } from '../../../utils/søknad';
import styled from 'styled-components/macro';
import { Checkbox } from '@navikt/ds-react';

const StyledCheckbox = styled.div`
  label {
    text-align: left;
  }
  margin: 1rem 0;
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
        checked={skalHaBarnepass}
        onChange={() => toggleSkalHaBarnepass(id)}
      >
        {hentTekst('barnadine.knapp.søkBarnetilsyn', intl)}
      </Checkbox>
    </StyledCheckbox>
  );
};

export default BarnMedISøknad;
