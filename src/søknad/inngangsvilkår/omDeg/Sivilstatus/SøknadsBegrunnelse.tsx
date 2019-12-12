import React, { FC, SyntheticEvent, useState } from 'react';
import MultiSvarSpørsmål from '../../../../components/MultiSvarSpørsmål';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/datovelger/Datovelger';
import {
  IMultiSpørsmål as ISpørsmål,
  IMultiSpørsmål,
  IMultiSvar as ISvar,
} from '../../../../models/spørsmal';
import { BegrunnelseSpørsmål } from '../../../../config/SivilstatusConfig';
import useSøknadContext from '../../../../context/SøknadContext';
import { injectIntl } from 'react-intl';
import SeksjonGruppe from '../../../../components/SeksjonGruppe';
import { Element } from 'nav-frontend-typografi';
import { returnerMultiSvar } from '../../../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import FeltGruppe from '../../../../components/FeltGruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

const Søknadsbegrunnelse: FC<any> = ({ intl }) => {
  const spørsmål: IMultiSpørsmål = BegrunnelseSpørsmål;
  const { søknad, settSøknad } = useSøknadContext();
  const {
    begrunnelseForSøknad,
    datoEndringISamvær,
    datoFlyttetFraHverandre,
  } = søknad;
  const [alertTekst, settAlertTekst] = useState('');

  const endringIsamværsordningTekstid =
    BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;
  const samlivsbruddForelderTekstid =
    BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid =
    BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;

  const endringISamvær =
    begrunnelseForSøknad ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });
  const samlivsbrudd =
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddForelderTekstid }) ||
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddAndreTekstid });

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
    <SeksjonGruppe>
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
        {alertTekst && alertTekst !== '' ? (
          <FeltGruppe>
            <AlertStripeInfo className={'fjernBakgrunn'}>
              {alertTekst}
            </AlertStripeInfo>
          </FeltGruppe>
        ) : null}
      </div>
      {endringISamvær ? (
        <Datovelger
          objektnøkkel={'datoEndringISamvær'}
          valgtDato={
            søknad.datoEndringISamvær ? søknad.datoEndringISamvær : undefined
          }
          tekstid={'sivilstatus.begrunnelse.endring'}
          datobegrensning={DatoBegrensning.AlleDatoer}
        />
      ) : null}
      {samlivsbrudd ? (
        <Datovelger
          objektnøkkel={'datoFlyttetFraHverandre'}
          valgtDato={
            søknad.datoFlyttetFraHverandre
              ? søknad.datoFlyttetFraHverandre
              : undefined
          }
          tekstid={'sivilstatus.sporsmal.datoFlyttetFraHverandre'}
          datobegrensning={DatoBegrensning.AlleDatoer}
        />
      ) : null}
    </SeksjonGruppe>
  );
};

export default injectIntl(Søknadsbegrunnelse);
