import React, { FC, SyntheticEvent } from 'react';
import { IMultiSpørsmål as ISpørsmål, IMultiSvar } from '../../models/spørsmal';
import { injectIntl, IntlShape } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
  spørsmål: ISpørsmål;
  intl: IntlShape;
  onChange: (spørsmål: string, svar: string) => void;
  valgtSvar: string | undefined;
}

const MultiSvarSpørsmål: FC<Props> = ({
  spørsmål,
  intl,
  onChange,
  valgtSvar,
}) => {
  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: IMultiSvar
  ): void => {
    svar !== undefined &&
      onChange !== undefined &&
      onChange(
        intl.formatMessage({ id: spørsmål.tekstid }),
        intl.formatMessage({ id: svar.svar_tekstid })
      );
  };

  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
      <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
      <div className={'radioknapp__multiSvar'}>
        {spørsmål.svaralternativer.map((svar: IMultiSvar) => {
          const svarISøknad =
            intl.formatMessage({ id: svar.svar_tekstid }) === valgtSvar;
          return (
            <div key={svar.svar_tekstid} className={'radioknapp__item'}>
              <RadioPanel
                key={svar.svar_tekstid}
                name={spørsmål.spørsmål_id + svar}
                label={intl.formatMessage({
                  id: svar.svar_tekstid,
                })}
                value={svar.svar_tekstid}
                checked={svarISøknad ? svarISøknad : false}
                onChange={(e) => onClickHandle(e, spørsmål, svar)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default injectIntl(MultiSvarSpørsmål);
