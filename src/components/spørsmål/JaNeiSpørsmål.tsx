import React, { SyntheticEvent, useState } from 'react';
import { IJaNeiSpørsmål, IJaNeiSvar, ISvar } from '../../models/spørsmal';
import { Element } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import FeltGruppe from '../gruppe/FeltGruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../language/LocaleTekst';

interface Props {
  spørsmål: IJaNeiSpørsmål;
  onChange: (spørsmål: IJaNeiSpørsmål, svar: boolean) => void;
  valgtSvar: boolean | undefined;
}
const JaNeiSpørsmål: React.FC<Props> = ({ spørsmål, onChange, valgtSvar }) => {
  const intl = useIntl();
  const [harAlert, settAlert] = useState(false);
  const [valgtSvarAlertTekst, settValgtSvarAlertTekst] = useState('');
  const spørsmålTekst: string = intl.formatMessage({ id: spørsmål.tekstid });
  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: IJaNeiSpørsmål,
    svar: IJaNeiSvar
  ): void => {
    const erSvarJa = svar.svar_tekstid === ISvar.JA;

    onChange !== undefined && svar && onChange(spørsmål, erSvarJa);

    if (svar.alert_tekstid) {
      settAlert(true);
      settValgtSvarAlertTekst(svar.alert_tekstid);
    } else {
      settAlert(false);
      settValgtSvarAlertTekst('');
    }
  };

  const erValgtSvarRadioKnapp = (
    svar: IJaNeiSvar,
    valgtSvar: boolean
  ): boolean => {
    if (
      (svar.svar_tekstid === ISvar.JA && valgtSvar === true) ||
      (svar.svar_tekstid === ISvar.NEI && valgtSvar === false)
    )
      return true;
    else return false;
  };

  return (
    <div key={spørsmål.spørsmål_id} className="spørsmålgruppe">
      <Element>{spørsmålTekst}</Element>
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
          const svarISøknad =
            valgtSvar !== undefined && erValgtSvarRadioKnapp(svar, valgtSvar);
          return (
            <div key={svar.svar_tekstid} className={'radioknapp__item'}>
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

export default JaNeiSpørsmål;
