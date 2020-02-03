import React, { FC, useEffect } from 'react';

import { IMultiSpørsmål } from '../../../../models/spørsmal';
import { BegrunnelseSpørsmål } from './SivilstatusConfig';
import useSøknadContext from '../../../../context/SøknadContext';
import { injectIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import { Textarea } from 'nav-frontend-skjema';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';

const Søknadsbegrunnelse: FC<any> = ({ intl }) => {
  const spørsmål: IMultiSpørsmål = BegrunnelseSpørsmål;
  const { søknad, settSøknad } = useSøknadContext();
  const { sivilstatus } = søknad;
  const {
    begrunnelseForSøknad,
    begrunnelseAnnet,
    datoEndretSamvær,
    datoFlyttetFraHverandre,
    datoForSamlivsbrudd,
  } = sivilstatus;

  const endringIsamværsordningTekstid =
    BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;
  const samlivsbruddForelderTekstid =
    BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid =
    BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;
  const annetSvarTekst = BegrunnelseSpørsmål.svaralternativer[4].svar_tekstid;

  const annet =
    begrunnelseForSøknad?.verdi === intl.formatMessage({ id: annetSvarTekst });

  const samlivsbrudd =
    begrunnelseForSøknad?.verdi ===
      intl.formatMessage({ id: samlivsbruddForelderTekstid }) ||
    begrunnelseForSøknad?.verdi ===
      intl.formatMessage({ id: samlivsbruddAndreTekstid });

  const samlivsbruddMedAndreForelder =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: samlivsbruddForelderTekstid });

  const endretSamvær =
    begrunnelseForSøknad?.verdi ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });

  const settDato = (
    date: Date | null,
    objektnøkkel: string,
    tekst: string
  ): void => {
    date !== null &&
      settSøknad({
        ...søknad,
        sivilstatus: {
          ...sivilstatus,
          [objektnøkkel]: { label: tekst, verdi: date },
        },
      });
  };

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
    console.log(!samlivsbrudd, datoFlyttetFraHverandre, !endretSamvær);
    if (!samlivsbrudd && datoFlyttetFraHverandre) {
      const { datoFlyttetFraHverandre, ...nySivilstatusObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nySivilstatusObjekt });
    }

    if (!endretSamvær && datoEndretSamvær) {
      const { datoEndretSamvær, ...nySivilstatusObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nySivilstatusObjekt });
    }
  }, [
    datoEndretSamvær,
    datoFlyttetFraHverandre,
    settSøknad,
    sivilstatus,
    søknad,
    endretSamvær,
    samlivsbrudd,
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
      {endretSamvær ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) =>
              settDato(
                e,
                'datoEndretSamvær',
                intl.formatMessage({ id: 'sivilstatus.begrunnelse.endring' })
              )
            }
            valgtDato={datoEndretSamvær ? datoEndretSamvær.verdi : undefined}
            tekstid={'sivilstatus.begrunnelse.endring'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </KomponentGruppe>
      ) : null}

      {samlivsbruddMedAndreForelder ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) =>
              settDato(
                e,
                'datoForSamlivsbrudd',
                intl.formatMessage({
                  id: 'sivilstatus.sporsmål.datoForSamlivsbrudd',
                })
              )
            }
            valgtDato={
              datoForSamlivsbrudd ? datoForSamlivsbrudd.verdi : undefined
            }
            tekstid={'sivilstatus.sporsmål.datoForSamlivsbrudd'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <LocaleTekst tekst={'sivilstatus.alert.samlivsbrudd'} />
          </AlertStripeInfo>
        </KomponentGruppe>
      ) : null}

      {samlivsbrudd ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) =>
              settDato(
                e,
                'datoFlyttetFraHverandre',
                intl.formatMessage({
                  id: 'sivilstatus.sporsmal.datoFlyttetFraHverandre',
                })
              )
            }
            valgtDato={
              datoFlyttetFraHverandre
                ? datoFlyttetFraHverandre.verdi
                : undefined
            }
            tekstid={'sivilstatus.sporsmal.datoFlyttetFraHverandre'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </KomponentGruppe>
      ) : null}
      {annet ? (
        <KomponentGruppe>
          <Textarea
            label={intl.formatMessage({
              id: spørsmål.tekstid,
            })}
            placeholder={''}
            value={begrunnelseAnnet ? begrunnelseAnnet.verdi : ''}
            maxLength={2000}
            onChange={(e) => settTekstfeltBegrunnelseAnnet(e)}
          />
        </KomponentGruppe>
      ) : null}
    </SeksjonGruppe>
  );
};

export default injectIntl(Søknadsbegrunnelse);
