import React from 'react';
import styled from 'styled-components/macro';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { BodyShort } from '@navikt/ds-react';

const StyledLenkeMedIkon = styled.div`
  .lenke-knapp {
    display: flex;
    margin-top: 2rem;
    color: @navBla;
    text-decoration: underline;
    border: none;
    text-align: left;
    background: none;

    .typo-normal {
      margin-left: 1rem;
    }

    &:hover {
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

interface Props {
  onClick: any;
  tekst_id: string;
  ikon: string;
}

const LenkeMedIkon: React.FC<Props> = ({ onClick, tekst_id, ikon }) => {
  const intl = useLokalIntlContext();

  return (
    <StyledLenkeMedIkon>
      <button className="lenke-knapp" onClick={onClick}>
        <img alt="Endre informasjon" src={ikon} />
        <BodyShort>{intl.formatMessage({ id: tekst_id })}</BodyShort>
      </button>
    </StyledLenkeMedIkon>
  );
};

export default LenkeMedIkon;
