import React, { FC, SyntheticEvent, useState } from 'react';
import {
  IMultiSpørsmål as ISpørsmål,
  IMultiSvar as ISvar,
} from '../../models/spørsmal';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import { returnerMultiSvar } from '../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import FeltGruppe from '../FeltGruppe';

interface Props {
  spørsmål: ISpørsmål;
  intl: IntlShape;
}

const MultiSvarSpørsmål: FC<Props> = ({ spørsmål, intl }) => {
  const { søknad, settSøknad } = useSøknadContext();

  const [alertTekst, settAlertTekst] = useState('');

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    svar !== undefined &&
      settSøknad({
        ...søknad,
        [spørsmål.spørsmål_id]: intl.formatMessage({ id: svar.svar_tekstid }),
      });
    if (svar.alert_tekstid !== undefined) {
      settAlertTekst(intl.formatMessage({ id: svar.alert_tekstid }));
    } else {
      settAlertTekst('');
    }
  };

  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
      <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
      <div className={'radioknapp__multiSvar'}>
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarISøknad = returnerMultiSvar(spørsmål, svar, søknad, intl);
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
