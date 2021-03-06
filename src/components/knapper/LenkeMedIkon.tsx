import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();

  return (
    <StyledLenkeMedIkon>
      <button className="lenke-knapp" onClick={onClick}>
        <img alt="Endre informasjon" src={ikon} />
        <Normaltekst>{intl.formatMessage({ id: tekst_id })}</Normaltekst>
      </button>
    </StyledLenkeMedIkon>
  );
};

export default LenkeMedIkon;
