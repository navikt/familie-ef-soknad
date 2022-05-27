import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import download from '../../../assets/download.svg';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import styled from 'styled-components/macro';
import LocaleTekst from '../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';

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
  const intl = useLokalIntlContext();
  return (
    <SeksjonGruppe>
      <StyledUndertittel>
        <LocaleTekst tekst={'kvittering.tittel.huskeliste.erSyk'} />
      </StyledUndertittel>

      <Normaltekst>
        <LocaleTekst tekst={'kvittering.beskrivelse.huskeliste.erSyk'} />
      </Normaltekst>
      <StyledLenke>
        <Lenke href={filPath} download>
          <img alt="Nedlastingsikon" src={download} />
          <Element>
            {intl.formatMessage({ id: 'kvittering.knapp.huskeliste.erSyk' })}
          </Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SykSøker;
