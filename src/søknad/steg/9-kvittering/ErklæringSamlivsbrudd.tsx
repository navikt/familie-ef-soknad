import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import download from '../../../assets/download.svg';
import styled from 'styled-components/macro';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import LocaleTekst from '../../../language/LocaleTekst';
import { useIntl } from 'react-intl';
import { hentFilePath } from '../../../utils/språk';
import { useSpråkContext } from '../../../context/SpråkContext';

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
  const intl = useIntl();
  const { locale } = useSpråkContext();

  return (
    <SeksjonGruppe>
      <StyledUndertittel>
        <LocaleTekst tekst={'kvittering.tittel.samlivsbrudd'} />
      </StyledUndertittel>
      <Normaltekst>
        <LocaleTekst tekst={'kvittering.beskrivelse.samlivsbrudd'} />
      </Normaltekst>

      <StyledLenke>
        <Lenke
          href={hentFilePath(locale, {
            nb:
              '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrudd.pdf',
            en:
              '/familie/alene-med-barn/soknad/filer/Declaration_on_end_of_relationship_EN.pdf',
            nn:
              '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrot_NN.pdf',
          })}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Element>
            {intl.formatMessage({ id: 'kvittering.knapp.samlivsbrudd' })}
          </Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default ErklæringSamlivsbrudd;
