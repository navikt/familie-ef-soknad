import React, { SyntheticEvent, useState } from 'react';
import {
  IJaNeiSpørsmål as ISpørsmål,
  IJaNeiSvar,
  ISvar,
} from '../../models/spørsmal';
import { Element } from 'nav-frontend-typografi';
import { returnerJaNeiSvar } from '../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../context/SøknadContext';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import FeltGruppe from '../FeltGruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../language/LocaleTekst';

interface Props {
  spørsmål: ISpørsmål;
  intl: IntlShape;
  onChange?: (svar: boolean) => void;
  valgtSvar?: boolean;
}
const JaNeiSpørsmål: React.FC<Props> = ({
  spørsmål,
  intl,
  onChange,
  valgtSvar,
}) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [harAlert, settAlert] = useState(false);
  const [valgtSvarAlertTekst, settValgtSvarAlertTekst] = useState('');

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: IJaNeiSvar
  ): void => {
    settSøknad({
      ...søknad,
      [spørsmål.spørsmål_id]: svar.svar_tekstid === ISvar.JA,
    });
    if (svar.alert_tekstid) {
      settAlert(true);
      settValgtSvarAlertTekst(svar.alert_tekstid);
    } else {
      settAlert(false);
      settValgtSvarAlertTekst('');
    }
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
        {spørsmål.svaralternativer.map((svar: IJaNeiSvar) => {
          const svarISøknad = returnerJaNeiSvar(spørsmål, svar, søknad);
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
      {harAlert ? (
        <FeltGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <LocaleTekst tekst={valgtSvarAlertTekst} />
          </AlertStripeInfo>
        </FeltGruppe>
      ) : null}
    </div>
  );
};

export default injectIntl(JaNeiSpørsmål);
