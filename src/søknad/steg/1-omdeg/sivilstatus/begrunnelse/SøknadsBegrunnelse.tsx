import React, { FC, useEffect } from 'react';

import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import EndringISamvær from './EndringISamvær';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import { BegrunnelseSpørsmål } from '../SivilstatusConfig';
import { Textarea } from 'nav-frontend-skjema';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { ISpørsmål } from '../../../../../models/spørsmal';
import { hentTekst } from '../../../../../utils/søknad';
import { ISivilstatus } from '../../../../../models/steg/omDeg/sivilstatus';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatus: (sivilstatus: ISivilstatus) => void;
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
}

const Søknadsbegrunnelse: FC<Props> = ({
  sivilstatus,
  settSivilstatus,
  settDato,
}) => {
  const spørsmål: ISpørsmål = BegrunnelseSpørsmål;
  const intl = useIntl();

  const {
    begrunnelseForSøknad,
    datoForSamlivsbrudd,
    datoFlyttetFraHverandre,
    datoEndretSamvær,
    begrunnelseAnnet,
  } = sivilstatus;

  const hentTekstid = (svarNøkkel: string) => {
    const tekstid = spørsmål.svaralternativer.find(
      (svar) => svar.svar_tekstid.split('.')[2] === svarNøkkel
    );
    return tekstid?.svar_tekstid;
  };

  const erBegrunnelse = (id: string | undefined) => {
    return begrunnelseForSøknad?.verdi === intl.formatMessage({ id: id });
  };

  const samlivsbruddForelderTekstid = hentTekstid('samlivsbruddForeldre');
  const samlivsbruddAndreTekstid = hentTekstid('samlivsbruddAndre');
  const endringIsamværsordningTekstid = hentTekstid('endringISamværsordning');
  const dødsfallTekstid = hentTekstid('dødsfall');
  const annetSvarTekstid = hentTekstid('annet');

  const samlivsbruddMedForelder = erBegrunnelse(samlivsbruddForelderTekstid);
  const samlivsbruddAndre = erBegrunnelse(samlivsbruddAndreTekstid);
  const endretSamvær = erBegrunnelse(endringIsamværsordningTekstid);
  const dødsfall = erBegrunnelse(dødsfallTekstid);
  const annet = erBegrunnelse(annetSvarTekstid);

  const settTekstfeltBegrunnelseAnnet = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    begrunnelseForSøknad &&
      annet &&
      settSivilstatus({
        ...sivilstatus,
        begrunnelseAnnet: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: e.target.value,
        },
      });
  };

  const settBegrunnelseForSøknad = (spørsmål: ISpørsmål, svar: string) => {
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);
    settSivilstatus({
      ...sivilstatus,
      begrunnelseForSøknad: { label: spørsmålTekst, verdi: svar },
    });
  };

  const fjernIrrelevanteSøknadsfelter = () => {
    if (!samlivsbruddMedForelder && datoForSamlivsbrudd) {
      const { datoForSamlivsbrudd, ...nySivilstatusObjekt } = sivilstatus;
      settSivilstatus(nySivilstatusObjekt);
    }

    if (
      !samlivsbruddAndre &&
      datoFlyttetFraHverandre &&
      !samlivsbruddMedForelder
    ) {
      const { datoFlyttetFraHverandre, ...nySivilstatusObjekt } = sivilstatus;
      settSivilstatus(nySivilstatusObjekt);
    }

    if (!endretSamvær && datoEndretSamvær) {
      const { datoEndretSamvær, ...nySivilstatusObjekt } = sivilstatus;
      settSivilstatus(nySivilstatusObjekt);
    }
  };

  useEffect(() => {
    fjernIrrelevanteSøknadsfelter();
  });

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={spørsmål.tekstid}
          spørsmål={spørsmål}
          valgtSvar={sivilstatus.begrunnelseForSøknad?.verdi}
          settSpørsmålOgSvar={settBegrunnelseForSøknad}
        />
      </KomponentGruppe>

      {samlivsbruddMedForelder && (
        <>
          <DatoForSamlivsbrudd
            settDato={settDato}
            datoForSamlivsbrudd={datoForSamlivsbrudd}
          />
        </>
      )}

      {samlivsbruddAndre && (
        <NårFlyttetDereFraHverandre
          settDato={settDato}
          datoFlyttetFraHverandre={datoFlyttetFraHverandre}
        />
      )}

      {endretSamvær && (
        <EndringISamvær
          settDato={settDato}
          datoEndretSamvær={datoEndretSamvær}
        />
      )}

      {dødsfall && (
        <KomponentGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <FormattedHTMLMessage id={'sivilstatus.alert.dødsfall'} />
          </AlertStripeInfo>
        </KomponentGruppe>
      )}

      {annet && (
        <KomponentGruppe>
          <Textarea
            label={intl.formatMessage({
              id: spørsmål.tekstid,
            })}
            value={begrunnelseAnnet ? begrunnelseAnnet.verdi : ''}
            maxLength={2000}
            onChange={(e) => settTekstfeltBegrunnelseAnnet(e)}
          />
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Søknadsbegrunnelse;
