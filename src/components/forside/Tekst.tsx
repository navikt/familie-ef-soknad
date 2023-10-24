import { BodyShort } from '@navikt/ds-react';
import { hentTekst } from '../../utils/søknad';
import { useLokalIntlContext } from '../../context/LokalIntlContext';

export const Tekst: React.FC<{ tekst: string }> = ({ tekst }) => {
  const intl = useLokalIntlContext();
  return <BodyShort>{hentTekst(tekst, intl)}</BodyShort>;
};
