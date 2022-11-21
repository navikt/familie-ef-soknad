import styled, { CSSObject } from 'styled-components/macro';
import { TextField } from '@navikt/ds-react';

type bredde = 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';

interface Props {
  bredde?: bredde;
}

export const TextFieldMedBredde = styled(TextField)<Props>(
  (props: Props): CSSObject => {
    return props.bredde ? breddeTilStyle[props.bredde] : {};
  }
);

const breddeTilStyle: Record<bredde, CSSObject> = {
  L: {
    width: '100%',
    maxWidth: '280px',
  },
  M: {
    width: '100%',
    maxWidth: '210px',
  },
  S: {
    width: '140px',
  },
  XL: {
    width: '100%',
    maxWidth: '350px',
  },
  XS: {
    width: '70px',
  },
  XXL: {
    width: '100%',
    maxWidth: '420px',
  },
  XXS: {
    width: '70px',
  },
  fullbredde: {
    width: '100%',
  },
};
