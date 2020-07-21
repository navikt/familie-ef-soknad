import React from 'react';
import styled from 'styled-components/macro';
import { Input, Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

const StyledComponent = styled.div`
  display: grid;
  grid-template-columns: min-content max-content;
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'label label'
    'input tegn';

  .skjemaelement__label {
    grid-area: label;
    font-size: 18px;
  }
  .skjemaelement {
    grid-area: input;
  }
  .typo-normal {
    padding-left: 0.5rem;
    grid-area: tegn;
    align-self: center;
  }
`;

interface Props {
  label: string;
  nøkkel: string;
  type: string;
  bredde?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
  settInputFelt: (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: string,
    label: string
  ) => void;
  beskrivendeTekst: string;
  value: string;
  feil?: React.ReactNode | boolean;
}

const InputLabelGruppe: React.FC<Props> = ({
  label,
  nøkkel,
  value,
  type,
  bredde,
  settInputFelt,
  beskrivendeTekst,
  feil,
}) => {
  return (
    <StyledComponent>
      <Label htmlFor={label}> {label}</Label>
      <Input
        id={label}
        key={label}
        type={type}
        bredde={bredde}
        onChange={(e) => settInputFelt(e, nøkkel, label)}
        value={value}
        feil={feil}
      />
      <Normaltekst>{beskrivendeTekst}</Normaltekst>
    </StyledComponent>
  );
};

export default InputLabelGruppe;
