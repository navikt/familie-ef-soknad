import React, { FC } from 'react';

import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import EndringISamvær from './EndringISamvær';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import { BegrunnelseSpørsmål } from '../SivilstatusConfig';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import {
  hentSvarAlertFraSpørsmål,
  hentTekst,
} from '../../../../../utils/søknad';
import {
  EBegrunnelse,
  ISivilstatus,
} from '../../../../../models/steg/omDeg/sivilstatus';
import { ISpørsmål, ISvar } from '../../../../../models/spørsmålogsvar';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useSøknad } from '../../../../../context/SøknadContext';

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
  const { settDokumentasjonsbehov } = useSøknad();

  const {
    årsakEnslig,
    datoForSamlivsbrudd,
    datoFlyttetFraHverandre,
    datoEndretSamvær,
  } = sivilstatus;

  const erBegrunnelse = (svaralternativ: EBegrunnelse): boolean => {
    return årsakEnslig?.svarid === svaralternativ;
  };

  const samlivsbruddMedForelder = erBegrunnelse(
    EBegrunnelse.samlivsbruddForeldre
  );
  const samlivsbruddAndre: boolean = erBegrunnelse(
    EBegrunnelse.samlivsbruddAndre
  );
  const endretSamvær: boolean = erBegrunnelse(
    EBegrunnelse.endringISamværsordning
  );
  const dødsfall: boolean = erBegrunnelse(EBegrunnelse.dødsfall);

  const settÅrsakEnslig = (spørsmål: ISpørsmål, svar: ISvar) => {
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    const nyttSivilstatusObjekt = fjernIrrelevanteSøknadsfelter(svar);

    settSivilstatus({
      ...nyttSivilstatusObjekt,
      årsakEnslig: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: spørsmålTekst,
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const fjernIrrelevanteSøknadsfelter = (svar: ISvar): ISivilstatus => {
    const nySivilStatusObjekt = sivilstatus;
    if (svar.id !== EBegrunnelse.samlivsbruddForeldre && datoForSamlivsbrudd) {
      delete nySivilStatusObjekt.datoForSamlivsbrudd;
    }
    if (svar.id !== EBegrunnelse.samlivsbruddAndre && datoFlyttetFraHverandre) {
      delete nySivilStatusObjekt.datoFlyttetFraHverandre;
    }

    if (svar.id !== EBegrunnelse.endringISamværsordning && datoEndretSamvær) {
      delete nySivilStatusObjekt.datoEndretSamvær;
    }
    return nySivilStatusObjekt;
  };

  const alertTekstForDødsfall = hentSvarAlertFraSpørsmål(
    EBegrunnelse.dødsfall,
    spørsmål
  );

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={spørsmål.tekstid}
          spørsmål={spørsmål}
          valgtSvar={sivilstatus.årsakEnslig?.verdi}
          settSpørsmålOgSvar={settÅrsakEnslig}
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
            <FormattedHTMLMessage id={alertTekstForDødsfall} />
          </AlertStripeInfo>
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Søknadsbegrunnelse;
