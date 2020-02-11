import React, { FC, useEffect } from 'react';

import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import EndringISamvær from './EndringISamvær';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import useSøknadContext from '../../../../../context/SøknadContext';
import { BegrunnelseSpørsmål } from '../SivilstatusConfig';
import { IMultiSpørsmål } from '../../../../../models/spørsmal';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
}

const Søknadsbegrunnelse: FC<Props> = ({ settDato }) => {
  const spørsmål: IMultiSpørsmål = BegrunnelseSpørsmål;
  const intl = useIntl();

  const { søknad, settSøknad } = useSøknadContext();
  const { sivilstatus } = søknad;
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

  const samlivsbruddForelderTekstid = hentTekstid('samlivsbruddForeldre');
  const samlivsbruddAndreTekstid = hentTekstid('samlivsbruddAndre');
  const endringIsamværsordningTekstid = hentTekstid('endringISamværsordning');
  const annetSvarTekstid = hentTekstid('annet');

  const samlivsbruddMedAndreForelder =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: samlivsbruddForelderTekstid });
  const samlivsbruddAndre =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: samlivsbruddAndreTekstid });
  const endretSamvær =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });
  const annet =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: annetSvarTekstid });

  const settTekstfeltBegrunnelseAnnet = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    begrunnelseForSøknad &&
      annet &&
      settSøknad({
        ...søknad,
        sivilstatus: {
          ...sivilstatus,
          begrunnelseAnnet: {
            label: intl.formatMessage({ id: spørsmål.tekstid }),
            verdi: e.target.value,
          },
        },
      });
  };

  const settBegrunnelseForSøknad = (spørsmål: string, svar: string) => {
    settSøknad({
      ...søknad,
      sivilstatus: {
        ...sivilstatus,
        begrunnelseForSøknad: { label: spørsmål, verdi: svar },
      },
    });
  };

  useEffect(() => {
    if (!samlivsbruddMedAndreForelder && datoForSamlivsbrudd) {
      const { datoForSamlivsbrudd, ...nySivilstatusObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nySivilstatusObjekt });
    }

    if (
      !samlivsbruddAndre &&
      datoFlyttetFraHverandre &&
      !samlivsbruddMedAndreForelder
    ) {
      const { datoFlyttetFraHverandre, ...nySivilstatusObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nySivilstatusObjekt });
    }

    if (!endretSamvær && datoEndretSamvær) {
      const { datoEndretSamvær, ...nySivilstatusObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nySivilstatusObjekt });
    }
  }, [
    datoForSamlivsbrudd,
    datoEndretSamvær,
    datoFlyttetFraHverandre,
    endretSamvær,
    samlivsbruddAndre,
    samlivsbruddMedAndreForelder,
    settSøknad,
    sivilstatus,
    søknad,
  ]);

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={spørsmål.tekstid}
          spørsmål={spørsmål}
          valgtSvar={sivilstatus.begrunnelseForSøknad?.verdi}
          onChange={settBegrunnelseForSøknad}
        />
      </KomponentGruppe>

      {samlivsbruddMedAndreForelder ? (
        <>
          <DatoForSamlivsbrudd
            settDato={settDato}
            datoForSamlivsbrudd={datoForSamlivsbrudd}
          />
        </>
      ) : null}

      {samlivsbruddMedAndreForelder || samlivsbruddAndre ? (
        <NårFlyttetDereFraHverandre
          settDato={settDato}
          datoFlyttetFraHverandre={datoFlyttetFraHverandre}
        />
      ) : null}

      {endretSamvær ? (
        <EndringISamvær
          settDato={settDato}
          datoEndretSamvær={datoEndretSamvær}
        />
      ) : null}

      {annet ? (
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
      ) : null}
    </SeksjonGruppe>
  );
};

export default Søknadsbegrunnelse;
