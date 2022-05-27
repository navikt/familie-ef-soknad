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

const SyktBarn: FC = () => {
  const intl = useLokalIntlContext();
  const { locale } = useSpråkContext();
  return (
    <SeksjonGruppe>
      <StyledUndertittel>
        <LocaleTekst tekst={'kvittering.tittel.huskeliste.syktBarn'} />
      </StyledUndertittel>
      <Normaltekst>
        <LocaleTekst tekst={'kvittering.beskrivelse.huskeliste.syktBarn'} />
      </Normaltekst>
      <StyledLenke>
        <Lenke
          href={hentFilePath(locale, {
            nb: '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_sykt_barn_OS.pdf',
            en: '/familie/alene-med-barn/soknad/filer/Checklist_for_your_doctors_appointment_child_OS_EN.pdf',
            nn: '/familie/alene-med-barn/soknad/filer/Hugseliste_lege_sjukt_barn_OS_NN.pdf',
          })}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Element>
            {intl.formatMessage({ id: 'kvittering.knapp.huskeliste.syktBarn' })}
          </Element>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SyktBarn;
