import React, { SyntheticEvent } from 'react';
import { IJaNeiSpørsmål as ISpørsmål, ISvar } from '../../models/spørsmal';
import { Element } from 'nav-frontend-typografi';
import {
  returnerJaNeiSvar,
  hentTekstidTilJaNeiSvar,
} from '../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../context/SøknadContext';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

interface Props {
  spørsmål: ISpørsmål;
  intl: IntlShape;
}
const JaNeiSpørsmål: React.FC<Props> = ({ spørsmål, intl }) => {
  const { søknad, settSøknad } = useSøknadContext();

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    settSøknad({ ...søknad, [spørsmål.spørsmål_id]: svar === ISvar.JA });
  };

  return (
    <div key={spørsmål.spørsmål_id} className="spørsmålgruppe">
      <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
      {spørsmål.lesmer ? (
        <Lesmerpanel
          apneTekst={intl.formatMessage({ id: spørsmål.lesmer.åpneTekstid })}
          className={'hjelpetekst'}
        >
          {intl.formatMessage({ id: spørsmål.lesmer.innholdTekstid })}
        </Lesmerpanel>
      ) : null}
      <div className={'radioknapp__jaNeiSvar'}>
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarISøknad = returnerJaNeiSvar(spørsmål, svar, søknad);
          return (
            <div key={svar} className={'radioknapp__item'}>
              <RadioPanel
                key={svar}
                name={spørsmål.spørsmål_id + svar}
                label={intl.formatMessage({
                  id: hentTekstidTilJaNeiSvar(svar),
                })}
                value={svar}
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

export default injectIntl(JaNeiSpørsmål);
