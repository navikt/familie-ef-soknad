import { ConfirmationPanel, Heading, BodyShort } from '@navikt/ds-react';
import styled from 'styled-components';
import { hentBeskjedMedNavn } from '../../utils/språk';
import { hentTekst } from '../../utils/søknad';
import React from 'react';
import { LokalIntlShape } from '../../language/typer';
import { IPerson } from '../../models/søknad/person';

const StyledConfirmationPanel = styled(ConfirmationPanel)`
  margin-bottom: 2rem;
`;

const DisclaimerTittel = styled(Heading)`
  margin-bottom: 1rem;
`;

export const DisclaimerBoks: React.FC<{
  person: IPerson;
  tekst: string;
  harBekreftet: boolean;
  settBekreftelse: (bekreftet: boolean) => void;
  intl: LokalIntlShape;
}> = ({ person, tekst, harBekreftet, settBekreftelse, intl }) => {
  return (
    <>
      <DisclaimerTittel level="2" size="small">
        {hentTekst('skjema.forside.disclaimer.tittel', intl)}
      </DisclaimerTittel>
      <StyledConfirmationPanel
        checked={!!harBekreftet}
        label={hentBeskjedMedNavn(
          person.søker.forkortetNavn,
          intl.formatMessage({ id: 'side.bekreftelse' })
        )}
        onChange={() => settBekreftelse(!harBekreftet)}
      >
        <BodyShort>{hentTekst(tekst, intl)}</BodyShort>
      </StyledConfirmationPanel>
    </>
  );
};
