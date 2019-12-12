import React, { FC, SyntheticEvent, useState } from 'react';
import {
  IMultiSpørsmål,
  IMultiSpørsmål as ISpørsmål,
  IMultiSvar as ISvar,
} from '../models/spørsmal';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import { returnerMultiSvar } from '../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import FeltGruppe from './FeltGruppe';
import { BegrunnelseSpørsmål } from '../config/SivilstatusConfig';

interface Props {
  spørsmål: ISpørsmål;
  tekstid: string;
  intl: IntlShape;
}

const MultiSvarSpørsmål: FC<Props> = ({ spørsmål, tekstid, intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { begrunnelseForSøknad, datoFlyttetFraHverandre } = søknad;
  const endringIsamværsordningTekstid = BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;

  const samlivsbruddForelderTekstid = BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid = BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;

  const endringISamvær = begrunnelseForSøknad === intl.formatMessage({ id: endringIsamværsordningTekstid});
  const samlivsbrudd = (begrunnelseForSøknad === intl.formatMessage(
    {id: samlivsbruddForelderTekstid})) || (begrunnelseForSøknad === intl.formatMessage({ id: samlivsbruddAndreTekstid}));

  const resetDatoISøknad = (dato: Date | undefined) => {
    console.log('resetDatoISøknad',samlivsbrudd)
    const objektnavn = samlivsbrudd ? 'datoFlyttetFraHverandre':'datoEndringISamvær';
    const { [objektnavn]: _, ...nyttSøknadObjekt } = søknad;
    dato !== undefined && settSøknad({ ...nyttSøknadObjekt });
  };

  const [alertTekst, settAlertTekst] = useState('');

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    console.log('clicked', svar.svar_tekstid, spørsmål.spørsmål_id);
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

    console.log('begrunnelse i søknad: ', søknad.begrunnelseForSøknad)
    console.log('samlivsbrudd begrunnelser?', samlivsbrudd);

    samlivsbrudd && resetDatoISøknad(datoFlyttetFraHverandre);
    endringISamvær && søknad.datoEndringISamvær && resetDatoISøknad(søknad.datoEndringISamvær);

  };

    console.log('begrunnelse i søknad: ', søknad.begrunnelseForSøknad)
  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
      <Element>{intl.formatMessage({ id: tekstid })}</Element>
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
      {alertTekst && alertTekst !== '' ? (
        <FeltGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            {alertTekst}
          </AlertStripeInfo>
        </FeltGruppe>
      ) : null}
    </div>
  );
};

export default injectIntl(MultiSvarSpørsmål);
