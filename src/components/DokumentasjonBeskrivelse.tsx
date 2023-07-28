import { BodyShort, ReadMore } from '@navikt/ds-react';
import SeksjonGruppe from './gruppe/SeksjonGruppe';
import FormattedHtmlMessage from '../language/FormattedHtmlMessage';
import styled from 'styled-components';
import { hentTekst } from '../utils/søknad';
import { useLokalIntlContext } from '../context/LokalIntlContext';

const ReadMoreMedPadding = styled(ReadMore)`
  padding: 1rem 0;
`;

interface Props {
  harDokumentasjonsbehov: boolean;
}

export const DokumentasjonBeskrivelse: React.FC<Props> = ({
  harDokumentasjonsbehov,
}) => {
  const intl = useLokalIntlContext();
  return (
    <SeksjonGruppe>
      <BodyShort>
        {intl.formatMessage({
          id: harDokumentasjonsbehov
            ? 'dokumentasjon.beskrivelse'
            : 'dokumentasjon.ingenDokumentasjonsbehov.beskrivelse',
        })}
      </BodyShort>
      <ReadMoreMedPadding
        header={hentTekst('dokumentasjon.beskrivelseBilderHeader', intl)}
      >
        <FormattedHtmlMessage id={'dokumentasjon.beskrivelseBilderInnhold'} />
      </ReadMoreMedPadding>
      <BodyShort>
        <FormattedHtmlMessage id={'dokumentasjon.beskrivelseSlutt'} />
      </BodyShort>
    </SeksjonGruppe>
  );
};
