import { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import download from '../../../assets/download.svg';
import styled from 'styled-components/macro';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import LocaleTekst from '../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentFilePath } from '../../../utils/språk';
import { useSpråkContext } from '../../../context/SpråkContext';
import { BodyShort, Label } from '@navikt/ds-react';

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
  const intl = useLokalIntlContext();
  const { locale } = useSpråkContext();

  return (
    <SeksjonGruppe>
      <StyledUndertittel size="small">
        <LocaleTekst tekst={'kvittering.tittel.samlivsbrudd'} />
      </StyledUndertittel>
      <BodyShort>
        <LocaleTekst tekst={'kvittering.beskrivelse.samlivsbrudd'} />
      </BodyShort>

      <StyledLenke>
        <Lenke
          href={hentFilePath(locale, {
            nb: '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrudd.pdf',
            en: '/familie/alene-med-barn/soknad/filer/Declaration_on_end_of_relationship_EN.pdf',
            nn: '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrot_NN.pdf',
          })}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Label>
            {intl.formatMessage({ id: 'kvittering.knapp.samlivsbrudd' })}
          </Label>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default ErklæringSamlivsbrudd;
