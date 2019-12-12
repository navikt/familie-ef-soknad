import React, { FC } from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/datovelger/Datovelger';
import { IMultiSpørsmål } from '../../../../models/spørsmal';
import { BegrunnelseSpørsmål } from '../../../../config/SivilstatusConfig';
import useSøknadContext from '../../../../context/SøknadContext';
import { injectIntl } from 'react-intl';
import SeksjonGruppe from '../../../../components/SeksjonGruppe';
import MultiSvarSpørsmål from '../../../../components/MultiSvarSpørsmål';

const Søknadsbegrunnelse: FC<any> = ({ intl }) => {
  const spørsmål: IMultiSpørsmål = BegrunnelseSpørsmål;
  const { søknad, settSøknad } = useSøknadContext();
  const {
    begrunnelseForSøknad,

    datoEndretSamvær,
    datoFlyttetFraHverandre,
  } = søknad;

  const endringIsamværsordningTekstid =
    BegrunnelseSpørsmål.svaralternativer[3].svar_tekstid;
  const samlivsbruddForelderTekstid =
    BegrunnelseSpørsmål.svaralternativer[0].svar_tekstid;
  const samlivsbruddAndreTekstid =
    BegrunnelseSpørsmål.svaralternativer[1].svar_tekstid;

  console.log(
    endringIsamværsordningTekstid,
    intl.formatMessage({ id: endringIsamværsordningTekstid }),
    begrunnelseForSøknad
  );

  const endretSamvær =
    begrunnelseForSøknad ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });
  const samlivsbrudd =
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddForelderTekstid }) ||
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddAndreTekstid });

  // Er klar over at disse to if-setningene kan/bør skrives til en gjenbrukbar funksjon. Men å fjerne dato (deconstructe datoene ut og sette et nytt objekt uten datoene) funker ikke med mindre strengen med dato nøkkel navnet er rett over der man setter det nye objektet. Prøvd mye rart noe som har kræsjet. Så endte opp med denne løsningen som ikke kræsjet men med litt mindre penere kode.
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

  return (
    <SeksjonGruppe>
      <MultiSvarSpørsmål spørsmål={spørsmål} />
      {endretSamvær ? (
        <>
          <Datovelger
            objektnøkkel={'datoEndretSamvær'}
            valgtDato={
              søknad.datoEndretSamvær ? søknad.datoEndretSamvær : undefined
            }
            tekstid={'sivilstatus.begrunnelse.endring'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </>
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
