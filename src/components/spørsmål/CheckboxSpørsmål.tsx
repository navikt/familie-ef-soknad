import React from 'react';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import { CheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import LocaleTekst from '../../language/LocaleTekst';
import styled from 'styled-components/macro';
import Hjelpetekst from '../Hjelpetekst';

const StyledCheckboxSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;

      .inputPanel__label  {
        font-size: 18px;
      }
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
}
const CheckboxSpørsmål: React.FC<Props> = ({
  spørsmål,
  settValgteSvar,
  valgteSvar,
}) => {
  return (
    <SkjemaGruppe
      key={spørsmål.tekstid}
      legend={<LocaleTekst tekst={spørsmål.tekstid} />}
      aria-live="polite"
    >
      <StyledCheckboxSpørsmål key={spørsmål.søknadid}>
        {spørsmål.lesmer && (
          <Hjelpetekst
            åpneTekstid={spørsmål.lesmer.åpneTekstid}
            innholdTekstid={spørsmål.lesmer.innholdTekstid}
          />
        )}
        <div className={'radioknapp__multiSvar'}>
          {spørsmål.svaralternativer.map((svar: ISvar) => {
            const alleredeHuketAvISøknad = valgteSvar.some((valgtSvar) => {
              return valgtSvar === svar.svar_tekst || valgtSvar === svar.id;
            });

            return (
              <CheckboksPanel
                className={`inputPanel__field radioknapp-${spørsmål.søknadid}-${svar.svar_tekst}`}
                key={svar.svar_tekst}
                label={svar.svar_tekst}
                checked={alleredeHuketAvISøknad}
                onChange={() =>
                  settValgteSvar(spørsmål, alleredeHuketAvISøknad, svar)
                }
              />
            );
          })}
        </div>
      </StyledCheckboxSpørsmål>
    </SkjemaGruppe>
  );
};

export default CheckboxSpørsmål;
