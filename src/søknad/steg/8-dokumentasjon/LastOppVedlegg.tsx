import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Filopplaster from '../../../components/filopplaster/Filopplaster';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { hentTekst } from '../../../utils/søknad';
import {
  BarnetilsynDokumentasjon,
  IDokumentasjon,
} from '../../../models/steg/dokumentasjon';
import { IVedlegg } from '../../../models/steg/vedlegg';
import { EFiltyper } from '../../../helpers/filtyper';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import FormattedHtmlMessage from '../../../language/FormattedHtmlMessage';
import { BodyShort, Checkbox, Heading } from '@navikt/ds-react';

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
  const intl = useLokalIntlContext();

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
        <Heading size="small" level="3">
          <LocaleTekst tekst={dokumentasjon.tittel} />
        </Heading>
      </FeltGruppe>
      {dokumentasjon.beskrivelse && (
        <FeltGruppe>
          <BodyShort>
            <FormattedHtmlMessage id={dokumentasjon.beskrivelse} />
          </BodyShort>
        </FeltGruppe>
      )}
      {hvisIkkeFakturaForBarnepass && (
        <FeltGruppe>
          <Checkbox
            checked={dokumentasjon.harSendtInn}
            onChange={settHarSendtInnTidligere}
          >
            {hentTekst('dokumentasjon.checkbox.sendtTidligere', intl)}
          </Checkbox>
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
