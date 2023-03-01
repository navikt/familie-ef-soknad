import React from 'react';
import styled from 'styled-components/macro';
import { Label } from 'nav-frontend-skjema';
import LesMerTekst from '../LesMerTekst';
import { IHjelpetekst } from '../../models/felles/hjelpetekst';
import { BodyShort } from '@navikt/ds-react';
import { TextFieldMedBredde } from '../TextFieldMedBredde';

const StyledComponent = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: repeat(3, min-content);
  grid-template-areas:
    'label label'
    'hjelpetekst hjelpetekst'
    'input tegn';

  .skjemaelement__label {
    grid-area: label;
  }

  .navds-form-field {
    grid-area: input;
  }

  .navds-body-short {
    padding-left: 0.5rem;
    grid-area: tegn;
    align-self: center;
  }
`;

const LesMerContainer = styled.div`
  grid-area: hjelpetekst;
  margin-bottom: 0.5rem;
`;

interface Props {
  label: string;
  hjelpetekst?: IHjelpetekst;
  nøkkel: string;
  type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
  bredde?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
  settInputFelt: (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: string,
    label: string
  ) => void;
  beskrivendeTekst: string;
  value: string;
  feil?: React.ReactNode | boolean;
  placeholder?: string;
}

const InputLabelGruppe: React.FC<Props> = ({
  label,
  hjelpetekst,
  nøkkel,
  value,
  type,
  bredde,
  settInputFelt,
  beskrivendeTekst,
  feil,
  placeholder,
}) => {
  return (
    <StyledComponent aria-live="polite">
      <Label htmlFor={label}> {label}</Label>
      {hjelpetekst && (
        <LesMerContainer>
          <LesMerTekst
            åpneTekstid={hjelpetekst.headerTekstid}
            innholdTekstid={hjelpetekst.innholdTekstid}
          />
        </LesMerContainer>
      )}
      <TextFieldMedBredde
        label={label}
        hideLabel
        aria-label={label}
        id={label}
        key={label}
        type={type}
        bredde={bredde}
        onChange={(e) => settInputFelt(e, nøkkel, label)}
        value={value}
        error={feil}
        placeholder={placeholder}
      />
      <BodyShort>{beskrivendeTekst}</BodyShort>
    </StyledComponent>
  );
};

export default InputLabelGruppe;
