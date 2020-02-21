import React, { FC, SyntheticEvent } from 'react';
import { ISpørsmål } from '../../models/spørsmal';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { ISvar } from '../../models/spørsmal';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import styled from 'styled-components';

const StyledMultisvarSpørsmål = styled.div`
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
  onChange: (spørsmål: string, svar: string) => void;
  valgtSvar: string | undefined;
}

const MultiSvarSpørsmål: FC<Props> = ({ spørsmål, onChange, valgtSvar }) => {
  const intl = useIntl();
  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    svar !== undefined &&
      onChange !== undefined &&
      onChange(
        intl.formatMessage({ id: spørsmål.tekstid }),
        intl.formatMessage({ id: svar.svar_tekstid })
      );
  };

  return (
    <StyledMultisvarSpørsmål key={spørsmål.spørsmål_id}>
      <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
      {spørsmål.lesmer ? (
        <Lesmerpanel
          apneTekst={intl.formatMessage({ id: spørsmål.lesmer.åpneTekstid })}
          className={'hjelpetekst'}
        >
          {intl.formatMessage({ id: spørsmål.lesmer.innholdTekstid })}
        </Lesmerpanel>
      ) : null}
      <div className={'radioknapp__multiSvar'}>
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarISøknad =
            intl.formatMessage({ id: svar.svar_tekstid }) === valgtSvar;
          return (
            <RadioPanel
              key={svar.svar_tekstid}
              name={spørsmål.spørsmål_id}
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
    </StyledMultisvarSpørsmål>
  );
};

export default MultiSvarSpørsmål;
