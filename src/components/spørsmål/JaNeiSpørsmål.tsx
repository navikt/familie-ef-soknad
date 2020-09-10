import React, { SyntheticEvent } from 'react';
import {
  ISpørsmål,
  ISvar,
  ESvarTekstid,
} from '../../models/felles/spørsmålogsvar';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import Hjelpetekst from '../Hjelpetekst';
import styled from 'styled-components/macro';

const StyledJaNeiSpørsmål = styled.div`
  .radioknapp {
    &__jaNeiSvar {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;

      .inputPanel__label  {
        font-size: 18px;
      }

      .typo_element {
        font-size: 18px;
      }

      @media all and (max-width: 420px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

interface Props {
  spørsmål: ISpørsmål;
  onChange: (spørsmål: ISpørsmål, svar: ISvar) => void;
  valgtSvar: boolean | undefined;
}
const JaNeiSpørsmål: React.FC<Props> = ({ spørsmål, onChange, valgtSvar }) => {
  const intl = useIntl();

  const spørsmålTekst: string = intl.formatMessage({ id: spørsmål.tekstid });

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    onChange !== undefined && svar && onChange(spørsmål, svar);
  };

  const erValgtSvarRadioKnapp = (svar: ISvar, valgtSvar: boolean): boolean => {
    return (
      (svar.svar_tekstid === ESvarTekstid.JA && valgtSvar === true) ||
      (svar.svar_tekstid === ESvarTekstid.NEI && valgtSvar === false)
    );
  };

  return (
    <SkjemaGruppe legend={spørsmålTekst}>
      <StyledJaNeiSpørsmål key={spørsmål.søknadid}>
        {spørsmål.lesmer && (
          <Hjelpetekst
            åpneTekstid={spørsmål.lesmer.åpneTekstid}
            innholdTekstid={spørsmål.lesmer.innholdTekstid}
          />
        )}
        <div className={'radioknapp__jaNeiSvar'}>
          {spørsmål.svaralternativer.map((svar: ISvar) => {
            const svarISøknad =
              valgtSvar !== undefined && erValgtSvarRadioKnapp(svar, valgtSvar);

            return (
              <RadioPanel
                className={`inputPanel__field ${spørsmål.søknadid}-${svar.svar_tekstid}`}
                key={svar.svar_tekstid}
                name={spørsmål.søknadid}
                label={intl.formatMessage({
                  id: svar.svar_tekstid,
                })}
                value={svar.svar_tekstid}
                checked={svarISøknad ? svarISøknad : false}
                onChange={(e) => onClickHandle(e, spørsmål, svar)}
              />
            );
          })}
        </div>
      </StyledJaNeiSpørsmål>
    </SkjemaGruppe>
  );
};

export default JaNeiSpørsmål;
