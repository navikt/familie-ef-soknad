import React, { FC } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import download from '../../../assets/download.svg';
import styled from 'styled-components';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

const StyledLenke = styled.div`
  margin-top: 1rem;

  img {
    margin-right: 0.5rem;
    display: inline;
  }

  p {
    display: inline;
  }
`;

const ErklæringSamlivsbrudd: FC = () => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>Bekreftelse på samlivsbrudd</Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Normaltekst>
          Siden du skal dokumentere samlivsbrudd med den andre forelderen, har
          vi laget et forslag til bekreftelse du kan bruke.
        </Normaltekst>
      </FeltGruppe>
      <StyledLenke>
        <Lenke
          href={
            '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrudd.pdf'
          }
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Element>Last ned forslag til bekreftelse på samlivsbrudd</Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default ErklæringSamlivsbrudd;
