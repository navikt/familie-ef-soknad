import React, { FC, useEffect } from 'react';

import { IMultiSpørsmål } from '../../../../../models/spørsmal';
import { BegrunnelseSpørsmål } from '../SivilstatusConfig';
import useSøknadContext from '../../../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import { Textarea } from 'nav-frontend-skjema';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import EndringISamvær from './EndringISamvær';

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

  const samlivsbruddForelderTekstid =
    BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid =
    BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;
  const endringIsamværsordningTekstid =
    BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;
  const annetSvarTekstid = BegrunnelseSpørsmål.svaralternativer[4].svar_tekstid;

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
