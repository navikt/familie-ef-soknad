import React, { SyntheticEvent } from 'react';
import useSøknadContext from './../../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import { hentSvar } from '../../utils/søknad';
import { injectIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../models/spørsmal';
import { RadioPanel } from 'nav-frontend-skjema';
import { SpørsmålOgSvar } from '../../config/MedlemskapConfig';

const Medlemskap: React.FC<any> = ({ intl }) => {
  const medlemskapSpørsmålSvar: ISpørsmål[] = SpørsmålOgSvar;
  const medlemskapKeys: string[] = medlemskapSpørsmålSvar.map((spørsmål) => {
    return spørsmål.spørsmål_id;
  });
  const { søknad, settSøknad } = useSøknadContext();

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    const medlemskapKey = medlemskapKeys.find((key: string) => {
      return spørsmål.spørsmål_id === key;
    });
    medlemskapKey !== undefined &&
      settSøknad({ ...søknad, [medlemskapKey]: svar.value === 'ja' });
  };

  return (
    <section>
      {medlemskapSpørsmålSvar.map((spørsmål: ISpørsmål) => {
        return (
          <div key={spørsmål.spørsmål_id} className="spørsmålgruppe">
            <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
            <div className={'radioknapp__wrapper'}>
              {spørsmål.svaralternativer.map((svar: ISvar) => {
                const svarISøknad = hentSvar(spørsmål, svar, søknad);
                return (
                  <div key={svar.tekstid} className={'radioknapp__item'}>
                    <RadioPanel
                      key={svar.tekstid}
                      name={svar.tekstid}
                      label={intl.formatMessage({ id: svar.tekstid })}
                      value={svar.value}
                      checked={svarISøknad ? svarISøknad : false}
                      onChange={(e) => onClickHandle(e, spørsmål, svar)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default injectIntl(Medlemskap);
