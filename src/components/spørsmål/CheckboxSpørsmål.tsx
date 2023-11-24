import React from 'react';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import LocaleTekst from '../../language/LocaleTekst';
import styled from 'styled-components';
import LesMerTekst from '../LesMerTekst';
import { logSpørsmålBesvart } from '../../utils/amplitude';
import { skjemanavnTilId, urlTilSkjemanavn } from '../../utils/skjemanavn';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import CheckboxPanelCustom from '../panel/CheckboxPanel';
import { CheckboxGroup } from '@navikt/ds-react';

const StyledCheckboxSpørsmål = styled.div`
  .navds-fieldset .navds-checkboxes {
    margin-top: 0;
  }
  .navds-checkboxes {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    grid-gap: 1rem;
    padding-top: 1rem;

    @media all and (max-width: 420px) {
      grid-template-columns: 1fr;
    }
  }
`;

interface Props {
  spørsmål: ISpørsmål;
  settValgteSvar: (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => void;
  valgteSvar: string[];
  skalLogges: boolean;
  brukSvarIdSomVerdi?: boolean;
}

const CheckboxSpørsmål: React.FC<Props> = ({
  spørsmål,
  settValgteSvar,
  valgteSvar,
  skalLogges,
  brukSvarIdSomVerdi,
}) => {
  const intl = useLokalIntlContext();

  const url = window.location.href;

  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const legend = intl.formatMessage({ id: spørsmål.tekstid });
  console.log(valgteSvar);
  return (
    <StyledCheckboxSpørsmål key={spørsmål.søknadid}>
      <div>
        <CheckboxGroup
          legend={<LocaleTekst tekst={spørsmål.tekstid} />}
          value={valgteSvar}
          description={
            spørsmål.lesmer && (
              <LesMerTekst
                åpneTekstid={spørsmål.lesmer.headerTekstid}
                innholdTekstid={spørsmål.lesmer.innholdTekstid}
              />
            )
          }
        >
          {spørsmål.svaralternativer.map((svar: ISvar) => {
            const alleredeHuketAvISøknad = valgteSvar.some((valgtSvar) => {
              return valgtSvar === svar.svar_tekst || valgtSvar === svar.id;
            });

            return (
              <CheckboxPanelCustom
                key={svar.svar_tekst}
                value={brukSvarIdSomVerdi ? svar.id : svar.svar_tekst}
                checked={alleredeHuketAvISøknad}
                onChange={() => {
                  if (!alleredeHuketAvISøknad) {
                    logSpørsmålBesvart(
                      skjemanavn,
                      skjemaId,
                      legend,
                      svar.svar_tekst,
                      skalLogges
                    );
                  }

                  settValgteSvar(spørsmål, alleredeHuketAvISøknad, svar);
                }}
              >
                {svar.svar_tekst}
              </CheckboxPanelCustom>
            );
          })}
        </CheckboxGroup>
      </div>
    </StyledCheckboxSpørsmål>
  );
};

export default CheckboxSpørsmål;
