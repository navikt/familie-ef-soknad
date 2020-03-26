import React from 'react';
import { ISpørsmål, ISvar } from '../../models/spørsmalogsvar';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { CheckboksPanel } from 'nav-frontend-skjema';
import LocaleTekst from '../../language/LocaleTekst';
import styled from 'styled-components';

const StyledCheckboxSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;
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
  const intl = useIntl();

  return (
    <StyledCheckboxSpørsmål key={spørsmål.søknadid}>
      <Element>
        <LocaleTekst tekst={spørsmål.tekstid} />
      </Element>
      <div className={'radioknapp__multiSvar'}>
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarTekst = intl.formatMessage({ id: svar.svar_tekstid });
          const alleredeHuketAvISøknad = valgteSvar.some((valgtSvar) => {
            return valgtSvar === svarTekst;
          });

          return (
            <CheckboksPanel
              key={svar.svar_tekstid}
              label={svarTekst}
              checked={alleredeHuketAvISøknad}
              onChange={() =>
                settValgteSvar(spørsmål, alleredeHuketAvISøknad, svar)
              }
            />
          );
        })}
      </div>
    </StyledCheckboxSpørsmål>
  );
};

export default CheckboxSpørsmål;
