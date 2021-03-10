import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Filopplaster from '../../../components/filopplaster/Filopplaster';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Checkbox } from 'nav-frontend-skjema';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import {
  BarnetilsynDokumentasjon,
  IDokumentasjon,
} from '../../../models/steg/dokumentasjon';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IVedlegg } from '../../../models/steg/vedlegg';
import { EFiltyper } from '../../../helpers/filtyper';

interface Props {
  dokumentasjon: IDokumentasjon;
  oppdaterDokumentasjon: (
    dokumentasjonsid: string,
    opplastedeVedlegg: IVedlegg[] | undefined,
    harSendtInnTidligere: boolean
  ) => void;
}

const LastOppVedlegg: React.FC<Props> = ({
  dokumentasjon,
  oppdaterDokumentasjon,
}) => {
  const intl = useIntl();

  const settHarSendtInnTidligere = (e: any) => {
    const huketAv = e.target.checked;
    const vedlegg = huketAv ? [] : dokumentasjon.opplastedeVedlegg;
    oppdaterDokumentasjon(dokumentasjon.id, vedlegg, huketAv);
  };

  const hvisIkkeFakturaForBarnepass =
    dokumentasjon.id !== BarnetilsynDokumentasjon.FAKTURA_BARNEPASSORDNING;

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel tag="h3">
          <LocaleTekst tekst={dokumentasjon.tittel} />
        </Undertittel>
      </FeltGruppe>
      {dokumentasjon.beskrivelse && (
        <FeltGruppe>
          <Normaltekst>
            <FormattedHTMLMessage id={dokumentasjon.beskrivelse} />
          </Normaltekst>
        </FeltGruppe>
      )}
      {hvisIkkeFakturaForBarnepass && (
        <FeltGruppe>
          <Checkbox
            label={hentTekst('dokumentasjon.checkbox.sendtTidligere', intl)}
            checked={dokumentasjon.harSendtInn}
            onChange={settHarSendtInnTidligere}
          />
        </FeltGruppe>
      )}
      {!dokumentasjon.harSendtInn && (
        <Filopplaster
          oppdaterDokumentasjon={oppdaterDokumentasjon}
          dokumentasjon={dokumentasjon}
          maxFilstørrelse={1024 * 1024 * 10}
          tillatteFiltyper={[
            EFiltyper.PNG,
            EFiltyper.PDF,
            EFiltyper.JPG,
            EFiltyper.JPEG,
          ]}
        />
      )}
    </SeksjonGruppe>
  );
};

export default LastOppVedlegg;
