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
import { filStorresleOgTypeStreng } from '../../../utils/nedlastningFilformater';
import { useHentMalInformasjon } from '../../../utils/hooks';

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

  const hentSoknadBasertPaBrukerSprak = (): string => {
    return hentFilePath(locale, {
      nb: '/familie/alene-med-barn/soknad/filer/Huskeliste_lege_sykt_barn_OS.pdf',
      en: '/familie/alene-med-barn/soknad/filer/Checklist_for_your_doctors_appointment_child_OS_EN.pdf',
      nn: '/familie/alene-med-barn/soknad/filer/Hugseliste_lege_sjukt_barn_OS_NN.pdf',
    })
  }

  const {filstorrelse, filtype} = useHentMalInformasjon(hentSoknadBasertPaBrukerSprak())

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
          href={hentSoknadBasertPaBrukerSprak()}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Label as="p">
            {intl.formatMessage({ id: 'kvittering.knapp.huskeliste.syktBarn' })}
            {filStorresleOgTypeStreng(filtype, filstorrelse)}
          </Label>
        </Link>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SyktBarn;
