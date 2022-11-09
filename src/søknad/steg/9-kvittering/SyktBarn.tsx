import { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import download from '../../../assets/download.svg';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import styled from 'styled-components/macro';
import LocaleTekst from '../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentFilePath } from '../../../utils/språk';
import { useSpråkContext } from '../../../context/SpråkContext';
import { BodyShort, Label, Link } from '@navikt/ds-react';

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
      <StyledUndertittel size="small">
        <LocaleTekst tekst={'kvittering.tittel.huskeliste.syktBarn'} />
      </StyledUndertittel>
      <BodyShort>
        <LocaleTekst tekst={'kvittering.beskrivelse.huskeliste.syktBarn'} />
      </BodyShort>
      <StyledLenke>
        <Link
          href={hentFilePath(locale, {
            nb: '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_sykt_barn_OS.pdf',
            en: '/familie/alene-med-barn/soknad/filer/Checklist_for_your_doctors_appointment_child_OS_EN.pdf',
            nn: '/familie/alene-med-barn/soknad/filer/Hugseliste_lege_sjukt_barn_OS_NN.pdf',
          })}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Label>
            {intl.formatMessage({ id: 'kvittering.knapp.huskeliste.syktBarn' })}
          </Label>
        </Link>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SyktBarn;
