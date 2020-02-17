import React, { FC, SyntheticEvent } from 'react';
import { IMultiSpørsmål as ISpørsmål, IMultiSvar } from '../../models/spørsmal';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../context/SøknadContext';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { Element } from 'nav-frontend-typografi';
import { returnerMultiSvar } from '../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
  spørsmål: ISpørsmål;
  intl: IntlShape;
  onChange?: (svar: string) => void;
  valgtSvar?: string;
}

const MultiSvarSpørsmål: FC<Props> = ({
  spørsmål,
  intl,
  onChange,
  valgtSvar,
}) => {
  const { søknad, settSøknad } = useSøknadContext();

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: IMultiSvar
  ): void => {
    svar !== undefined &&
      onChange === undefined &&
      settSøknad({
        ...søknad,
        [spørsmål.spørsmål_id]: intl.formatMessage({ id: svar.svar_tekstid }),
      });

    svar !== undefined &&
      onChange !== undefined &&
      onChange(intl.formatMessage({ id: svar.svar_tekstid }));
  };

  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
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
        {spørsmål.svaralternativer.map((svar: IMultiSvar) => {
          const svarISøknad = valgtSvar
            ? intl.formatMessage({ id: svar.svar_tekstid }) === valgtSvar
            : returnerMultiSvar(spørsmål, svar, søknad, intl);
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
