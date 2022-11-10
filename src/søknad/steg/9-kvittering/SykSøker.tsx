import { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Lenke from 'nav-frontend-lenker';
import download from '../../../assets/download.svg';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import styled from 'styled-components/macro';
import LocaleTekst from '../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
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

const SykSøker: FC<{ filPath: string }> = ({ filPath }) => {
  const intl = useLokalIntlContext();
  return (
    <SeksjonGruppe>
      <StyledUndertittel size="small">
        <LocaleTekst tekst={'kvittering.tittel.huskeliste.erSyk'} />
      </StyledUndertittel>

      <BodyShort>
        <LocaleTekst tekst={'kvittering.beskrivelse.huskeliste.erSyk'} />
      </BodyShort>
      <StyledLenke>
        <Lenke href={filPath} download>
          <img alt="Nedlastingsikon" src={download} />
          <Label as="p">
            {intl.formatMessage({ id: 'kvittering.knapp.huskeliste.erSyk' })}
          </Label>
        </Lenke>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default SykSøker;
