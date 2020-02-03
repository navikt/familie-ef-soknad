import React, { FC } from 'react';

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
  const {
    begrunnelseForSøknad,
    datoEndretSamvær,
    datoFlyttetFraHverandre,
    begrunnelseAnnet,
  } = søknad;

  const endringIsamværsordningTekstid =
    BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;
  const samlivsbruddForelderTekstid =
    BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid =
    BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;
  const annetSvarTekst = BegrunnelseSpørsmål.svaralternativer[4].svar_tekstid;

  const samlivsbrudd =
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddForelderTekstid }) ||
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddAndreTekstid });
  const samlivsbruddMedAndreForelder =
    begrunnelseForSøknad ===
    intl.formatMessage({ id: samlivsbruddForelderTekstid });

  const endretSamvær =
    begrunnelseForSøknad ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });
  const annet =
    begrunnelseForSøknad === intl.formatMessage({ id: annetSvarTekst });

  if (!samlivsbrudd && datoFlyttetFraHverandre) {
    const objektnavn = 'datoFlyttetFraHverandre';
    const { [objektnavn]: _, ...nyttSøknadObjekt } = søknad;
    settSøknad({ ...nyttSøknadObjekt });
  }

  if (!endretSamvær && datoEndretSamvær) {
    const objektnavn = 'datoEndretSamvær';
    const { [objektnavn]: _, ...nyttSøknadObjekt } = søknad;
    settSøknad({ ...nyttSøknadObjekt });
  }

  const settDato = (date: Date | null, objektnøkkel: string): void => {
    date !== null && settSøknad({ ...søknad, [objektnøkkel]: date });
  };

  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    begrunnelseForSøknad &&
      annet &&
      settSøknad({
        ...søknad,
        begrunnelseAnnet: e.target.value,
      });
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål spørsmål={spørsmål} />
      </KomponentGruppe>
      {endretSamvær ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) => settDato(e, 'datoEndretSamvær')}
            valgtDato={
              søknad.datoEndretSamvær ? søknad.datoEndretSamvær : undefined
            }
            tekstid={'sivilstatus.begrunnelse.endring'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </KomponentGruppe>
      ) : null}

      {samlivsbruddMedAndreForelder ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) => settDato(e, 'datoForSamlivsbrudd')}
            valgtDato={
              søknad.datoForSamlivsbrudd
                ? søknad.datoForSamlivsbrudd
                : undefined
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
            settDato={(e) => settDato(e, 'datoFlyttetFraHverandre')}
            valgtDato={
              søknad.datoFlyttetFraHverandre
                ? søknad.datoFlyttetFraHverandre
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
            value={begrunnelseAnnet ? begrunnelseAnnet : ''}
            maxLength={2000}
            onChange={(e) => settBegrunnelse(e)}
          />
        </KomponentGruppe>
      ) : null}
    </SeksjonGruppe>
  );
};

export default injectIntl(Søknadsbegrunnelse);
