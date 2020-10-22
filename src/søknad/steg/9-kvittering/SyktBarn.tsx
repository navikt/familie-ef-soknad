import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import download from '../../../assets/download.svg';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import styled from 'styled-components/macro';

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

const SyktBarn: FC = () => {
  return (
    <SeksjonGruppe>
      <StyledUndertittel>Huskeliste til legen din</StyledUndertittel>
      <Normaltekst>
        Siden du skal dokumentere sykdom hos barnet ditt, har vi laget en
        huskeliste du kan ta med til legen for å være sikker på at legen
        dokumenterer de nødvendige opplysningene.
      </Normaltekst>
      <StyledLenke>
        <Lenke
          href="/familie/alene-med-barn/soknad/filer/Huskeliste_lege_sykt_barn_OS.pdf"
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Element>Last ned huskeliste til legen</Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SyktBarn;
