import React, { FC, useEffect } from 'react';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import LesMerTekst from '../LesMerTekst';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import Show from '../../utils/showIf';
import { logSpørsmålBesvart } from '../../utils/amplitude';
import { skjemanavnTilId, urlTilSkjemanavn } from '../../utils/skjemanavn';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Select } from '@navikt/ds-react';

const StyledSelect = styled.div`
  padding-top: 1rem;
`;

interface Props {
  spørsmål: ISpørsmål;
  settSpørsmålOgSvar: (spørsmål: ISpørsmål, svar: ISvar) => void;
  valgtSvarId: string | undefined;
  skalLogges?: boolean;
}

const SelectSpørsmål: FC<Props> = ({
  spørsmål,
  settSpørsmålOgSvar,
  valgtSvarId,
  skalLogges = true,
}) => {
  const intl = useLokalIntlContext();

  const url = window.location.href;

  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const legend = intl.formatMessage({ id: spørsmål.tekstid });

  const håndterSelectChange = (valgtVerdi: string) => {
    const svar = spørsmål.svaralternativer.find(
      (svar) => svar.id === valgtVerdi
    );

    if (svar !== undefined) {
      if (skalLogges) {
        logSpørsmålBesvart(
          skjemanavn,
          skjemaId,
          legend,
          svar.svar_tekst,
          skalLogges
        );
      }

      settSpørsmålOgSvar(spørsmål, svar);
    }
  };

  useEffect(() => {
    console.log(valgtSvarId);
  }, [valgtSvarId]);

  return (
    <SkjemaGruppe legend={legend}>
      <StyledSelect key={spørsmål.søknadid}>
        <Show if={spørsmål.lesmer}>
          <LesMerTekst
            åpneTekstid={spørsmål.lesmer ? spørsmål.lesmer.headerTekstid : ''}
            innholdTekstid={
              spørsmål.lesmer ? spørsmål!.lesmer!.innholdTekstid : ''
            }
          />
        </Show>
        <Select
          label={legend}
          hideLabel
          onChange={(e) => håndterSelectChange(e.target.value)} // Logg spørsmål
          value={valgtSvarId}
        >
          <option value="" disabled selected>
            Velg et alternativ
          </option>
          {spørsmål.svaralternativer.map((svar: ISvar) => (
            <option key={svar.id} value={svar.id}>
              {svar.svar_tekst}
            </option>
          ))}
        </Select>
      </StyledSelect>
    </SkjemaGruppe>
  );
};

export default SelectSpørsmål;
