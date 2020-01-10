import React, { FC } from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/datovelger/Datovelger';
import { IMultiSpørsmål } from '../../../../models/spørsmal';
import { BegrunnelseSpørsmål } from '../../../../config/SivilstatusConfig';
import useSøknadContext from '../../../../context/SøknadContext';
import { injectIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../components/MultiSvarSpørsmål';
import FeltGruppe from '../../../../components/FeltGruppe';

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

  const endretSamvær =
    begrunnelseForSøknad ===
    intl.formatMessage({ id: endringIsamværsordningTekstid });
  const samlivsbrudd =
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddForelderTekstid }) ||
    begrunnelseForSøknad ===
      intl.formatMessage({ id: samlivsbruddAndreTekstid });

  // Er klar over at disse to if-setningene kan/bør skrives til en gjenbrukbar funksjon.
  // Men å fjerne dato (deconstructe datoene ut og sette et nytt objekt uten datoene)
  // funker ikke med mindre strengen med dato nøkkel navnet er rett over der man setter det nye objektet.
  // Prøvd mye rart noe som har kræsjet. Så endte opp med denne løsningen som ikke kræsjet men med litt mindre penere kode.
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
    <KomponentGruppe>
      <MultiSvarSpørsmål spørsmål={spørsmål} />
      {endretSamvær ? (
        <FeltGruppe>
          <Datovelger
            objektnøkkel={'datoEndretSamvær'}
            valgtDato={
              søknad.datoEndretSamvær ? søknad.datoEndretSamvær : undefined
            }
            tekstid={'sivilstatus.begrunnelse.endring'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </FeltGruppe>
      ) : null}
      {samlivsbrudd ? (
        <FeltGruppe>
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
        </FeltGruppe>
      ) : null}
    </KomponentGruppe>
  );
};

export default injectIntl(Søknadsbegrunnelse);
