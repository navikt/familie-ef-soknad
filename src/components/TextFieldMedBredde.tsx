import styled, { CSSProp } from 'styled-components';
import { TextField } from '@navikt/ds-react';

type bredde = 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';

interface Props {
  bredde?: bredde;
}

export const TextFieldMedBredde = styled(TextField)<Props>`
  input {
    ${(props) => (props.bredde ? breddeTilStyle[props.bredde] : '')}
  }
`;

const breddeTilStyle: Record<bredde, CSSProp> = {
  L: {
    width: '100%',
    maxWidth: '315px',
  },
  M: {
    width: '100%',
    maxWidth: '235px',
  },
  S: {
    width: '160px',
  },
  XL: {
    width: '100%',
    maxWidth: '400px',
  },
  XS: {
    width: '110px',
  },
  XXL: {
    width: '100%',
    maxWidth: '470px',
  },
  XXS: {
    width: '80px',
  },
  fullbredde: {
    width: '100%',
  },
};
