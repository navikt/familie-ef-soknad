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

const SykSøker: FC<{ filPath: string }> = ({ filPath }) => {
  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>Huskeliste til legen din</Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Normaltekst>
          Siden du skal dokumentere at du er syk, har vi laget en huskeliste du
          kan ta med til legen for å være sikker på at legen dokumenterer de
          nødvendige opplysningene.
        </Normaltekst>
      </FeltGruppe>
      <StyledLenke>
        <Lenke href={filPath} download>
          <img alt="Nedlastingsikon" src={download} />
          <Element>Last ned huskeliste til legen</Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SykSøker;
